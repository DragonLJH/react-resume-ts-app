import { FC, useContext, useEffect, useState, useRef, useMemo } from 'react';
import './index.css';
import { DownloadOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Modal, Space, InputNumber } from 'antd';
// import html2canvas from 'html2canvas';
import printJs from 'print-js';
import componentList from "../../custom-component/component-list"
import Control from "./Control";
import commonContext from "../../commonContext";
import { getStyle, HEADER_Y, SIDER_LEFT_X } from "../../utils";
import { getID } from "../../utils/globalID";

// var id = 0;

// function getID() {
//     return id++
// }



const AppLayoutMain: FC = () => {
    /*-----------------------------------拖拽添加组件-------------------------------------------*/
    //状态管理，在App.tsx管理调用
    const myAuth: any = useContext(commonContext);
    let { componentData, selectComponent, selectComponentIndex } = myAuth.state
    let { style } = selectComponent


    // A4纸比例图布 根号2比1 高比宽
    const [a4Width, setA4Width] = useState(1000)

    const a4Height = useMemo(() => {
        return Math.SQRT2 * a4Width
    }, [a4Width])

    const [mainInsideData, setMainInsideData] = useState({ top: 0, left: 0, width: 0, height: 0 }) //拖拽实时

    const [range, setRange] = useState({ top: 0, left: 0, width: 0, height: 0 }) //选中范围

    const rangeRef = useRef<NodeJS.Timeout | null>(null) //useRef 用来存储之前的定时器 

    const [preview, setPreview] = useState(false);

    const [makeUpProps, setMakeUpProps] = useState({ resumeCompose: [], indexs: [] });

    // const modalRef: any = useRef()

    useEffect(() => {
        if (selectComponentIndex !== -1) {
            setMainInsideData(style)
        }
    }, [style])

    let guideList = [  //辅助线(absolute定位的辅助线)
        { guideName: "guideT", style: { top: mainInsideData.top, left: 0 } },
        { guideName: "guideB", style: { top: mainInsideData.top + mainInsideData.height, left: 0 } },
        { guideName: "guideL", style: { top: 0, left: mainInsideData.left } },
        { guideName: "guideR", style: { top: 0, left: mainInsideData.left + mainInsideData.width } },
    ]


    // const initialState = { componentData: [], selectComponent: {}, selectComponentIndex: "", };
    // const reducer = (prevState: any, action: any) => {
    //     let { data } = action
    //     switch (action.type) {
    //         case 'increment':
    //             return { ...prevState, componentData: [...prevState.componentData, data] };
    //         case 'change-select':
    //             return { ...prevState, selectComponent: data, selectComponentIndex: data.id };
    //         default:
    //             throw new Error();
    //     }
    // }
    // const [state, dispatch] = useReducer(reducer, initialState);

    const useMyDrop = (e: any) => {  // 拖拽事件 
        let index = e.dataTransfer.getData("index"); // 获取拖拽组件的id
        let componentItem = componentList[index]     // 获取拖拽组件
        let { clientX, clientY }: { clientX: number, clientY: number } = e  // 获取落点的 x y（clientX，clientY） 坐标
        componentItem.style = { ...componentItem.style, left: clientX - SIDER_LEFT_X, top: clientY - HEADER_Y }  // 给组件添加 x y（clientX，clientY） 坐标
        // dispatch({ type: 'increment', data: { ...componentItem, id: "component" + getID() } })  // 添加组件
        let newComponentItem = { ...componentItem, id: "component" + getID() }
        myAuth.increment(newComponentItem)

        e.preventDefault();
        e.stopPropagation();
    }

    const myDragOver = (e: any) => {  // 让拖拽事件获取落点的 x y（clientX，clientY） 坐标 
        e.preventDefault();
        e.stopPropagation();
    }

    const myMouseDown = (e: any) => {
        myAuth.changeSelect()
        setRange({ top: 0, left: 0, width: 0, height: 0 })
        // 初始节点
        let { clientX: InitialValueX, clientY: InitialValueY }: { clientX: number, clientY: number } = e

        const move = (moveEvent: any) => {
            // 解构赋值 给 moveX 和 moveY 分别赋值 clientX 和 clientY
            // 移动后的坐标
            let { clientX: moveX, clientY: moveY }: { clientX: number, clientY: number } = moveEvent
            let sLeft = (InitialValueX - SIDER_LEFT_X)
            let sTop = (InitialValueY - HEADER_Y)
            let sWidth = (moveX - InitialValueX)
            let sHeight = (moveY - InitialValueY)

            rangeCheck(sLeft, sTop, sLeft + sWidth, sTop + sHeight)
            if (sWidth < 0) {
                sLeft += sWidth
            }
            if (sHeight < 0) {
                sTop += sHeight
            }
            setRange({ top: sTop, left: sLeft, width: Math.abs(sWidth), height: Math.abs(sHeight) })
        }
        const up = (e: any) => {  // 鼠标松开结束事件的监听
            // setRange({ top: 0, left: 0, width: 0, height: 0 })
            document.removeEventListener("mousemove", move);
            document.removeEventListener("mouseup", up);
        };
        // 鼠标按下的时候分别监听鼠标移动事件和鼠标松开事件
        document.addEventListener("mousemove", move);
        document.addEventListener("mouseup", up);
    }

    // 选中框
    const rangeCheck = (x1: number, y1: number, x2: number, y2: number) => {
        let maxX = x1 > x2 ? x1 : x2
        let minX = x1 < x2 ? x1 : x2
        let maxY = y1 > y2 ? y1 : y2
        let minY = y1 < y2 ? y1 : y2
        let res: any = { resumeCompose: [], indexs: [] }
        if (rangeRef.current) clearTimeout(rangeRef.current)
        rangeRef.current = setTimeout(() => {
            // 计算出选中的组件
            for (let i = 0; i < componentData.length; i++) {
                let { top, left, width, height } = componentData[i].style
                if (minX < left && left + width < maxX && minY < top && top + height < maxY) {
                    res.indexs.unshift(i)
                    res.resumeCompose.push(componentData[i])
                }
            }
            // 根据选中的组件来调整选中框
            let rangeTop1: number = 0, rangeLeft1: number = 0, rangeTop2: number = 0, rangeLeft2: number = 0;
            res.resumeCompose.forEach((val: any, index: number) => {
                let { top, left, width, height } = val.style
                if (!index) {
                    rangeTop1 = top
                    rangeLeft1 = left
                    rangeTop2 = top + height
                    rangeLeft2 = left + width
                } else {
                    rangeTop1 = rangeTop1 > top ? top : rangeTop1;
                    rangeTop2 = rangeTop2 > top + height ? rangeTop2 : top + height;
                    rangeLeft1 = rangeLeft1 > left ? left : rangeLeft1;
                    rangeLeft2 = rangeLeft2 > left + width ? rangeLeft2 : left + width;
                }
            })
            setRange({ top: rangeTop1, left: rangeLeft1, width: rangeLeft2 - rangeLeft1, height: rangeTop2 - rangeTop1 })
            setMakeUpProps(res)
            // console.log(maxX, minX, maxY, minY)
            console.log(res)
        }, 100)


    }

    /*------------------------------------------------------------------------------*/
    const setComponentData = (data: any, index: number) => {
        let newComponentData = [...myAuth.state.componentData]
        newComponentData.splice(index, 1, data)
        myAuth.updataSelectComponent(data)
        myAuth.updataComponentData(newComponentData)
    }

    const setMainInsideDataFun = (data: any) => {
        // console.log("setMainInsideDataFun", data) 
        setMainInsideData(data)
    }

    /*------------------------------------------------------------------------------*/
    const download = () => {
        localStorage.setItem("test1", JSON.stringify(myAuth.state.componentData))
    }

    const delSelect = (index = selectComponentIndex) => {  //删除选中组件
        if (selectComponentIndex !== -1) {
            myAuth.changeSelect()
            let newComponentData = [...myAuth.state.componentData]
            newComponentData.splice(index, 1)
            myAuth.updataComponentData(newComponentData)
        }
    }

    const makeUp = () => {
        console.log("makeUp", makeUpProps.resumeCompose.length)
        if (makeUpProps.resumeCompose.length > 1) {
            new Promise((resolve) => {
                // 先把组合的组件删除再生产组合组件
                let newComponentData = [...myAuth.state.componentData]
                makeUpProps.indexs.forEach((val: number) => {
                    newComponentData.splice(val, 1)
                })
                myAuth.updataComponentData(newComponentData)
                resolve(true)
            }).then(() => {
                let componentItem = componentList[5]
                componentItem.style = range
                componentItem.propValue = getNewComposeProps(range, makeUpProps)
                // console.log("makeUp", getNewComposeProps(range, makeUpProps))
                myAuth.increment({ ...componentItem, id: "component" + getID() })
            })
            // 组合后清楚选中框中的数据
            setMakeUpProps({ resumeCompose: [], indexs: [] })
        }
        setRange({ top: 0, left: 0, width: 0, height: 0 })
        // console.log("makeUp", { ...componentItem, id: "component" + getID() })
    }

    // 计算组合后组件的样式百分比（top, left, width, height）
    const getNewComposeProps = (style: any, props: any) => {
        let { top, left, width, height }: { top: number, left: number, width: number, height: number } = style
        props.resumeCompose = props.resumeCompose.map((item: any) => {
            let { top: ist, left: isl, width: isw, height: ish } = item.style
            ist = (((ist - top) / height) * 100) + "%"
            isl = (((isl - left) / width) * 100) + "%"
            ish = ((ish / height) * 100) + "%"
            isw = ((isw / width) * 100) + "%"
            item.style = { ...item.style, top: ist, left: isl, width: isw, height: ish }
            return item
        })
        return props
    }

    // 拆分
    const breakUp = () => {
        if (selectComponent.componentId === 5) {
            let res: any = []
            let flagSelectComponent = { ...selectComponent } // 选中组件
            let { top, left, width, height } = flagSelectComponent.style // 选中样式
            const calculation = (res: string, parentParam: number, flag = 0) => { // 计算拆分后的组件的{ top, left, width, height }
                if (flag) return parseInt((((parseFloat(res.replace("%", "")) / 100) * flag) + parentParam).toFixed(0))
                return parseInt(((parseFloat(res.replace("%", "")) / 100) * parentParam).toFixed(0))
            }
            // 查询组合内部的组件进行拆分操作
            flagSelectComponent.propValue.resumeCompose.forEach((item: any) => {
                let { top: itop, left: ileft, width: iwidth, height: iheight } = item.style
                item.style = { ...item.style, top: calculation(itop, top, height), left: calculation(ileft, left, width), width: calculation(iwidth, width), height: calculation(iheight, height) }
                // console.log("breakUp", calculation(itop, top, height), calculation(ileft, left, width), calculation(iwidth, width), calculation(iheight, height))
                // 把修改后的值赋给res
                res.push(item)
            })
            // selectComponentIndex存在问题，让删除的不是选中组合组件 （后续处理）
            // 查找 选中的组合组件的id并将组件删除
            for (let i = 0; i < componentData.length; i++) {
                if (componentData[i].id === flagSelectComponent.id) {
                    delSelect(i)
                    break;
                }
            }
            // res将拆分好的组件新增
            res.forEach((item: any) => {
                myAuth.increment({ ...item, id: "component" + getID() })
            })
        }
    }

    return (
        <div className="AppLayoutMain">
            <div className="operation">
                <Space align="center" >
                    <span>
                        画布大小(宽度)
                        <InputNumber defaultValue={a4Width} onChange={setA4Width} />
                    </span>
                    <Button type="primary" onClick={breakUp}>
                        拆分
                    </Button>
                    <Button type="primary" onClick={makeUp}>
                        组合
                    </Button>
                    <Button type="primary" onClick={() => setPreview(true)}>
                        预览
                    </Button>
                    <Button onClick={delSelect} type="primary" icon={<DeleteOutlined />}></Button>
                    <Button onClick={download} type="primary" icon={<DownloadOutlined />}></Button>
                </Space>
            </div>

            <div className="AppLayoutMainEdit" onDrop={useMyDrop} onDragOver={myDragOver} onMouseDown={myMouseDown} style={{ width: a4Width, height: a4Height }}>
                <div className="range" style={getStyle({ ...range })}></div>
                {myAuth.state.componentData.map((item: any, index: number) => {
                    return (<Control setMainInsideData={setMainInsideDataFun} setComponentData={setComponentData}
                        element={item} index={index} activeComponent={myAuth.state.selectComponent.id === item.id} key={item.id}>
                        {item.component(item.propValue)}
                    </Control>)
                })}

                {guideList.map((val: any) => {
                    return (<div key={val.guideName} className={`guide ${val.guideName} ${myAuth.state.selectComponentIndex !== -1 ? 'active' : ''}`}
                        style={getStyle(val.style)}></div>)
                })}
            </div>
            <Modal

                centered
                closable={false}
                visible={preview}
                onCancel={() => setPreview(false)}
                okText="打印"
                onOk={() => {
                    // html2canvas截图失败，不采用html2canvas打印（Unable to access cssRules property DOMException: CSSStyleSheet.cssRules getter: Not allowed to access cross-origin stylesheet）（无法访问cssRules属性DomeException:CSSStyleSheet。cssRules getter:不允许访问跨源样式表）
                    // console.log("modalRef", modalRef.current)
                    // html2canvas(modalRef.current, { logging: false, scale: 0.9, allowTaint: true, useCORS: true, })
                    //     .then(function (canvas) {
                    //         printJs({
                    //             printable: "modalRef",
                    //             type: "html"
                    //         })
                    //         // console.log("modalRef", canvas)
                    //         // modalRef.current.appendChild(canvas);
                    //     });

                    // 打印，使用printJs进行打印
                    printJs({
                        printable: "modalRef",// id => modalRef
                        type: "html",
                        targetStyle: ["* "],
                        targetStyles: ["*"],
                        style: "@page{size:auto; margin: 0px;}"
                    })
                }}
                width={a4Width}
                bodyStyle={{ height: a4Height + "px", position: "relative" }}
            >
                <div id="modalRef">
                    {/* <div className="modal-div"></div> */}
                    {myAuth.state.componentData.map((item: any, index: number) => {
                        return <Control setMainInsideData={setMainInsideDataFun} setComponentData={setComponentData} element={item} index={index} activeComponent={false} key={item.id}>{item.component(item.propValue)}</Control>
                    })}
                </div>
            </Modal>
        </div>
    )
};

export default AppLayoutMain;
