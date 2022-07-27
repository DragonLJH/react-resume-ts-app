import React, { FC } from 'react';
import './index.css';
import registerComponent from "../../custom-component"


const AppLayoutLeft: FC = () => {
    console.log("AppLayoutLeft", registerComponent)

    const myDragstart = (e: any) => {
        e.dataTransfer.setData("index", e.target.dataset.index);
        console.log("AppLayoutLeft-myDragstart", e)
    }

    return (
        <div className="AppLayoutLeft" onDragStart={myDragstart}>
            {registerComponent.map((item: any, index: number) => {
                return (
                    // <div onRragstart={myDragstart} key={index}>{val.label}</div>
                    <div draggable data-index={item.componentId} key={index}>{item.label}</div>
                )
            })}
        </div>
    )
};

export default AppLayoutLeft;
