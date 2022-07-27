import React, { FC, useReducer } from 'react';
import './index.css';
import componentList from "../../custom-component/component-list"

var id = 0;

function getID() {
    return id++
}

const AppLayoutMain: FC = () => {
    const initialState = { componentData: [] };

    const reducer = (prevState: any, action: any) => {
        switch (action.type) {
            case 'increment':
                const { data } = action
                return { componentData: [...prevState.componentData, data] };
            default:
                throw new Error();
        }
    }
    const [state, dispatch] = useReducer(reducer, initialState);
    const myDrop = (e: any) => {
        let index = e.dataTransfer.getData("index");
        let componentItem = componentList[index]
        let { clientX, clientY }: { clientX: number, clientY: number } = e
        componentItem.style = { ...componentItem.style, left: clientX - 200, top: clientY - 100 }
        dispatch({ type: 'increment', data: { ...componentItem, id: "component" + getID() } })
        e.preventDefault();
        e.stopPropagation();
    }
    const myDragOver = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
    }

    return (
        <div style={{ position: "relative" }} className="AppLayoutMain" onDrop={myDrop} onDragOver={myDragOver}>
            {state.componentData.map((item: any) => {
                return <div style={{ ...item.style, position: "absolute" }} key={item.id}>{item.component()}</div>
            })}
        </div>
    )
};

export default AppLayoutMain;
