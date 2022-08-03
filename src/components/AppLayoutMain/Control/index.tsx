import { FC, useEffect, useState, useContext, useRef } from 'react';
import './index.css';
import { getStyle, HEADER_Y, SIDER_LEFT_X } from "../../../utils/index";
import commonContext from "../../../commonContext";

interface ControlProps {
    style?: any;
    // children?: Element | React.ReactNode; 
    children?: any;
    activeComponent?: any;
    element?: any;
    index?: number;
    setComponentData?: any;
}


const Control: FC<ControlProps> = (props: ControlProps) => {
    /*-------------------------------------节点控制组件放大缩小以及整体移动------------------------------------------*/
    //状态管理，在App.tsx管理调用
    const myAuth: any = useContext(commonContext);
    const { children, activeComponent, element, index, setComponentData } = props;
    const ref = useRef<NodeJS.Timeout | null>(null) //useRef 用来存储之前的定时器


    const [insideData, setInsideData] = useState({ top: 0, left: 0, width: 0, height: 0 }) //拖拽实时


    useEffect(() => {
        setInsideData(element.style)
    }, [element])  // 监听element的修改（同步由表单控件修改的数据）



    let guideList = [  //辅助线(绝对定位的辅助线，需要加上头部固定高度和左边固定宽度)
        { guideName: "guideT", style: { top: insideData.top + HEADER_Y, left: 0 } },
        { guideName: "guideB", style: { top: insideData.top + insideData.height + HEADER_Y, left: 0 } },
        { guideName: "guideL", style: { top: 0, left: insideData.left + SIDER_LEFT_X } },
        { guideName: "guideR", style: { top: 0, left: insideData.left + insideData.width + SIDER_LEFT_X } },
    ]


    const circleWc = 3  //circle宽高6px ，误差3px
    let moveList = [  //8个点控制组件大小
        { circleName: "t", style: { top: 0 - circleWc, left: insideData.width / 2, } },
        { circleName: "r", style: { top: insideData.height / 2, left: insideData.width - circleWc, } },
        { circleName: "b", style: { top: insideData.height - circleWc, left: insideData.width / 2, } },
        { circleName: "l", style: { top: insideData.height / 2, left: 0 - circleWc, } },
        { circleName: "lt", style: { top: 0 - circleWc, left: 0 - circleWc, } },
        { circleName: "rt", style: { top: 0 - circleWc, left: insideData.width - circleWc, } },
        { circleName: "rb", style: { top: insideData.height - circleWc, left: insideData.width - circleWc, } },
        { circleName: "lb", style: { top: insideData.height - circleWc, left: 0 - circleWc, } },
    ]


    const relocation = (e: any, name: string = "acquiesce") => {  // name（默认值：acquiesce（默许））不传值默认为整体移动
        myAuth.changeSelect(element, index)  //点击改变选中对象
        e.stopPropagation();
        e.preventDefault();

        const switchSet = (x: number, y: number) => { // 根据 name 节点（8个控制节点）控制组件的大小 （宽高）（放大缩小）
            let { top, left, width, height } = insideData
            if (name.indexOf("t") !== -1) {
                top += y
                height -= y
            }
            if (name.indexOf("b") !== -1) {
                height += y
            }
            if (name.indexOf("r") !== -1) {
                width += x
            }
            if (name.indexOf("l") !== -1) {
                left += x
                width -= x
            }
            if (name === "acquiesce") {
                top += y
                left += x
            }
            if (width > 10 && height > 10 && top > 0 && left > 0) {  //当宽度高度小于10的时候停止缩小,当 x y 坐标小于0时停止移动
                setInsideData({ ...insideData, top, left, width, height })
                adsorbGuide({ top, left, width, height })

                // 防抖
                if (ref.current) clearTimeout(ref.current)
                ref.current = setTimeout(() => {
                    element.style = { ...insideData, top, left, width, height }
                    setComponentData(element, index)
                }, 100)

            }
        }

        //吸附功能
        const adsorbGuide = (data: any) => {
            let ADSORB_SPACING = 10 //吸附界限
            let { top: stop, left: sleft, width: swidth, height: sheight } = data;
            let { id: sid } = myAuth.state.selectComponent;
            if (myAuth.state.componentData.length > 1) {
                for (let i = 0; i < myAuth.state.componentData.length; i++) {  // 对比
                    if (myAuth.state.componentData[i].id !== sid) {
                        let { top, left, width, height } = myAuth.state.componentData[i].style
                        // 吸附
                        if (Math.abs((stop + sheight) - top) < ADSORB_SPACING) {
                            stop = top - sheight
                        }
                        if (Math.abs((sleft + swidth) - left) < ADSORB_SPACING) {
                            sleft = left - swidth
                        }
                        if (Math.abs(stop - top) < ADSORB_SPACING) {
                            stop = top
                        }
                        if (Math.abs(sleft - left) < ADSORB_SPACING) {
                            sleft = left
                        }
                        if (Math.abs(stop - (top + height)) < ADSORB_SPACING) {
                            stop = top + height
                        }
                        if (Math.abs(sleft - (left + width)) < ADSORB_SPACING) {
                            sleft = left + width
                        }
                        setInsideData({ ...insideData, top: stop, left: sleft, width: swidth, height: sheight })

                        // 防抖
                        if (ref.current) clearTimeout(ref.current)
                        ref.current = setTimeout(() => {
                            element.style = { ...insideData, top: stop, left: sleft, width: swidth, height: sheight }
                            setComponentData(element, index)
                        }, 100)
                    }
                }
            }


        }


        // 解构赋值 给 InitialValueX 和 InitialValueY 分别赋值 clientX 和 clientY
        // 初始坐标
        let { clientX: InitialValueX, clientY: InitialValueY }: { clientX: number, clientY: number } = e
        const move = (moveEvent: any) => {
            // 解构赋值 给 moveX 和 moveY 分别赋值 clientX 和 clientY
            // 移动后的坐标
            let { clientX: moveX, clientY: moveY }: { clientX: number, clientY: number } = moveEvent
            switchSet(moveX - InitialValueX, moveY - InitialValueY)
            // console.log(myAuth.state)
            // adsorbGuide()
        }

        const up = (e: any) => {  // 鼠标松开结束事件的监听
            document.removeEventListener("mousemove", move);
            document.removeEventListener("mouseup", up);
        };

        // 鼠标按下的时候分别监听鼠标移动事件和鼠标松开事件
        document.addEventListener("mousemove", move);
        document.addEventListener("mouseup", up);
    }





    return (
        <div className="Control" style={getStyle({ ...insideData })} onMouseDown={relocation}>
            <div className={`moveComponent ${activeComponent ? 'active' : ''}`} >
                {children}
                {moveList.map((val) => {
                    return <div key={val.circleName} className={`circle ${val.circleName}`} style={getStyle(val.style)} onMouseDown={(e) => relocation(e, val.circleName)} ></div>
                })}
                {guideList.map((val) => {
                    return <div key={val.guideName} className={`guide ${val.guideName}`} style={getStyle(val.style)}></div>
                })}
            </div>
        </div>
    )
}

export default Control;