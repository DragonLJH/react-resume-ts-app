import { FC, useContext, useEffect, useState, useRef } from 'react';
import './index.css';
import { DownloadOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Modal, Space } from 'antd';
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

    const [mainInsideData, setMainInsideData] = useState({ top: 0, left: 0, width: 0, height: 0 }) //拖拽实时

    const [range, setRange] = useState({ top: 0, left: 0, width: 0, height: 0 }) //选中范围

    const rangeRef = useRef<NodeJS.Timeout | null>(null) //useRef 用来存储之前的定时器 

    const [preview, setPreview] = useState(false);

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

    const rangeCheck = (x1: number, y1: number, x2: number, y2: number) => {
        let maxX = x1 > x2 ? x1 : x2
        let minX = x1 < x2 ? x1 : x2
        let maxY = y1 > y2 ? y1 : y2
        let minY = y1 < y2 ? y1 : y2
        let res: any = []
        if (rangeRef.current) clearTimeout(rangeRef.current)
        rangeRef.current = setTimeout(() => {
            // 计算出选中的组件
            for (let i = 0; i < componentData.length; i++) {
                let { top, left, width, height } = componentData[i].style
                if (minX < left && left + width < maxX && minY < top && top + height < maxY) {
                    res.push(componentData[i])
                }
            }
            // 根据选中的组件来调整选中框
            let rangeTop1: number = 0, rangeLeft1: number = 0, rangeTop2: number = 0, rangeLeft2: number = 0;
            res.forEach((val: any, index: number) => {
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
            // console.log(maxX, minX, maxY, minY)
            console.log(res)
        }, 100)


    }

    /*------------------------------------------------------------------------------*/

    // const ControlsComponent = () => {

    //     myAuth.state.componentData.map((item: any, index: number) => {
    //         return <Control setComponentData={setComponentData} element={item} index={index} activeComponent={myAuth.state.selectComponent.id === item.id} key={item.id}>{item.component()}</Control>
    //     })
    // }  
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

    const download = () => {
        localStorage.setItem("test1", JSON.stringify(myAuth.state.componentData))
    }
    const delSelect = () => {  //删除选中组件
        if (selectComponentIndex !== -1) {
            myAuth.changeSelect()
            let newComponentData = [...myAuth.state.componentData]
            newComponentData.splice(selectComponentIndex, 1)
            myAuth.updataComponentData(newComponentData)
        }
    }

    return (
        <div className="AppLayoutMain">
            <div className="operation">
                <Space align="center">
                    <Button type="primary" onClick={() => setPreview(true)}>
                        预览
                    </Button>
                    <Button onClick={delSelect} type="primary" icon={<DeleteOutlined />}></Button>
                    <Button onClick={download} type="primary" icon={<DownloadOutlined />}></Button>
                </Space>
            </div>

            <div className="AppLayoutMainEdit" onDrop={useMyDrop} onDragOver={myDragOver} onMouseDown={myMouseDown}>
                <div className="range" style={getStyle({ ...range })}></div>
                {myAuth.state.componentData.map((item: any, index: number) => {
                    return <Control setMainInsideData={setMainInsideDataFun} setComponentData={setComponentData} element={item} index={index} activeComponent={myAuth.state.selectComponent.id === item.id} key={item.id}>{item.component(item.propValue)}</Control>
                })}

                {guideList.map((val) => {
                    return <div key={val.guideName} className={`guide ${val.guideName} ${myAuth.state.selectComponentIndex !== -1 ? 'active' : ''}`} style={getStyle(val.style)}></div>
                })}
            </div>
            <Modal
                centered
                closable={false}
                visible={preview}
                onCancel={() => setPreview(false)}
                width={1000}  
                bodyStyle={{ height: "800px", position: "relative" }}
            >
                <div className="modal-div"></div>
                {myAuth.state.componentData.map((item: any, index: number) => {
                    return <Control setMainInsideData={setMainInsideDataFun} setComponentData={setComponentData} element={item} index={index} activeComponent={false} key={item.id}>{item.component(item.propValue)}</Control>
                })}
            </Modal>
        </div>
    )
};

export default AppLayoutMain;
