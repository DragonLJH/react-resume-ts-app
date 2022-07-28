import React, { FC, useState } from 'react';
import './index.css';
import { getStyle } from "../../../utils/index";

interface ControlProps {
    style?: any;
    // children?: Element | React.ReactNode; 
    children?: any;
}

const Control: FC<ControlProps> = (props: ControlProps) => {
    const { children } = props;
    const [style, setStyle] = useState({
        top: 10,
        left: 10,
        width: 100,
        height: 100,
    })
    const circleWc = 3  //circle宽高6px ，误差3px
    let moveList = [  //8个点控制组件大小
        { circleName: "t", style: { top: 0 - circleWc, left: style.width / 2, } },
        { circleName: "r", style: { top: style.height / 2, left: style.width - circleWc, } },
        { circleName: "b", style: { top: style.height - circleWc, left: style.width / 2, } },
        { circleName: "l", style: { top: style.height / 2, left: 0 - circleWc, } },
        { circleName: "lt", style: { top: 0 - circleWc, left: 0 - circleWc, } },
        { circleName: "rt", style: { top: 0 - circleWc, left: style.width - circleWc, } },
        { circleName: "rb", style: { top: style.height - circleWc, left: style.width - circleWc, } },
        { circleName: "lb", style: { top: style.height - circleWc, left: 0 - circleWc, } },
    ]

    const cs = () => {
        setStyle({
            top: 10,
            left: 10,
            width: 200,
            height: 100,
        })
    }



    return (
        <div className="Control" style={getStyle({ ...style })} >
            <div className="moveComponent">
                {children}
                <div onClick={cs}>11111</div>
                {moveList.map((val) => {
                    return <div key={val.circleName} className={`circle ${val.circleName}`} style={getStyle(val.style)}></div>
                })}
            </div>
        </div>
    )
}

export default Control;