import React, { FC, useEffect, useState } from 'react';
import './index.css';
import { getStyle } from "../../../utils/index";

interface ControlProps {
    style?: any;
    // children?: Element | React.ReactNode; 
    children?: any;
}

const Control: FC<ControlProps> = (props: ControlProps) => {
    /*-------------------------------------节点控制组件放大缩小以及整体移动------------------------------------------*/

    const { children, style } = props;
    const [controlstyle, setControlStyle] = useState({
        top: 0,
        left: 0,
        width: 0,
        height: 0,
    })

    useEffect(() => {
        let { top, left, width, height } = style
        setControlStyle({ top, left, width, height })
    }, [])

    const circleWc = 3  //circle宽高6px ，误差3px
    let moveList = [  //8个点控制组件大小
        { circleName: "t", style: { top: 0 - circleWc, left: controlstyle.width / 2, } },
        { circleName: "r", style: { top: controlstyle.height / 2, left: controlstyle.width - circleWc, } },
        { circleName: "b", style: { top: controlstyle.height - circleWc, left: controlstyle.width / 2, } },
        { circleName: "l", style: { top: controlstyle.height / 2, left: 0 - circleWc, } },
        { circleName: "lt", style: { top: 0 - circleWc, left: 0 - circleWc, } },
        { circleName: "rt", style: { top: 0 - circleWc, left: controlstyle.width - circleWc, } },
        { circleName: "rb", style: { top: controlstyle.height - circleWc, left: controlstyle.width - circleWc, } },
        { circleName: "lb", style: { top: controlstyle.height - circleWc, left: 0 - circleWc, } },
    ]


    const relocation = (e: any, name: string = "acquiesce") => {  // name（默认值：acquiesce（默许））不传值默认为整体移动

        e.stopPropagation();
        e.preventDefault();

        const switchSet = (x: number, y: number) => { // 根据 name 节点（8个控制节点）控制组件的大小 （宽高）（放大缩小）
            let { top, left, width, height } = controlstyle
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
            if (width > 10 && height > 10 && top >= 0 && left >= 0) {  //当宽度高度小于10的时候停止缩小,当 x y 坐标小于0时停止移动
                setControlStyle({ top, left, width, height })
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
        <div className="Control" style={getStyle({ ...controlstyle })} onMouseDown={relocation}>
            <div className="moveComponent">
                {children}
                {moveList.map((val) => {
                    return <div key={val.circleName} className={`circle ${val.circleName}`} style={getStyle(val.style)} onMouseDown={(e) => relocation(e, val.circleName)} ></div>
                })}
            </div>
        </div>
    )
}

export default Control;