import { FC, useContext, useEffect, useState } from 'react';
import './index.css';

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
    let { selectComponent, selectComponentIndex } = myAuth.state
    let { style } = selectComponent

    const [mainInsideData, setMainInsideData] = useState({ top: 0, left: 0, width: 0, height: 0 }) //拖拽实时

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



    return (
        <div className="AppLayoutMain" onDrop={useMyDrop} onDragOver={myDragOver} onMouseDown={() => myAuth.changeSelect()}>
            {myAuth.state.componentData.map((item: any, index: number) => {
                return <Control setMainInsideData={setMainInsideDataFun} setComponentData={setComponentData} element={item} index={index} activeComponent={myAuth.state.selectComponent.id === item.id} key={item.id}>{item.component(item.propValue)}</Control>
            })}

            {guideList.map((val) => {
                return <div key={val.guideName} className={`guide ${val.guideName} ${myAuth.state.selectComponentIndex !== -1 ? 'active' : ''}`} style={getStyle(val.style)}></div>
            })}
        </div>
    )
};

export default AppLayoutMain;
