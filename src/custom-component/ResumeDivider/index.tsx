import React, { FC } from 'react';
import iconConfig from "../../utils/icon-config";
import { Divider } from 'antd';
import './index.css';
interface ResumeDividerProps {
    text: string;
    orientation?: "left" | "right" | "center" | undefined;
    type?: "horizontal" | "vertical" | undefined;
    icon?: string;
}
const ResumeDivider: FC<ResumeDividerProps> = (props: ResumeDividerProps) => {
    const { text, orientation, type, icon } = props
    const IconComponent = () => {
        if (icon) {
            return <span style={{ padding: "0px 5px" }}>{iconConfig[icon]()}</span>
        }
        return <span></span>
    }
    return (
        <Divider type={type} orientation={orientation} className="ResumeDivider">
            <IconComponent />  {text}
        </Divider>
    )
};

export default ResumeDivider;
