import React, { FC, useContext } from 'react';
import { Divider } from 'antd';
import './index.css';
import { SampleTemplate } from "./SampleTemplate"
import registerComponent from "../../custom-component"
import { mateComponent } from "../../custom-component/component-list"
import { IconComponent } from "../../utils/icon-config"
import commonContext from "../../commonContext";
import { getID } from "../../utils/globalID";


const AppLayoutLeft: FC = () => {
    const myAuth: any = useContext(commonContext);
    const myDragstart = (e: any) => {
        e.dataTransfer.setData("index", e.target.dataset.index);
    }
    // const onClick = () => {
    //     let test1 = JSON.parse(localStorage.getItem("test1") ?? "")
    //     test1 = test1.map((val: any) => {
    //         return { ...mateComponent.get(val.componentId), ...val, id: "component" + getID() }
    //     })
    //     myAuth.updataComponentData(test1)
    // }
    const templateFun = (data: any) => {
        let newData = data.map((val: any) => {
            return { ...mateComponent.get(val.componentId), ...val, id: "component" + getID() }
        })
        myAuth.updataComponentData(newData)
    }

    return (
        <div className="AppLayoutLeft" onDragStart={myDragstart}>
            <Divider>组件</Divider>
            {registerComponent.map((item: any, index: number) => {
                return (
                    // <div onRragstart={myDragstart} key={index}>{val.label}</div>
                    <div className="AppLayoutLeftItem" draggable data-index={item.componentId} key={index}>
                        <IconComponent name={item.icon} />
                        <span style={{ marginLeft: "10px" }}>{item.label}</span>
                    </div>
                )
            })}
            <Divider>模板</Divider>
            {/* <div onClick={onClick}>test</div> */}
            <SampleTemplate templateFun={templateFun} />
        </div>
    )
};

export default AppLayoutLeft;
