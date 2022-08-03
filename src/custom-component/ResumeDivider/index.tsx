import React, { FC } from 'react';
import { Divider } from 'antd';
import './index.css';
interface ResumeDividerProps {
    text: string;
    orientation?: "left" | "right" | "center" | undefined;
    type?: "horizontal" | "vertical" | undefined;
}
const ResumeDivider: FC<ResumeDividerProps> = (props: ResumeDividerProps) => {
    const { text, orientation, type } = props
    return (
        <Divider type={type} orientation={orientation} className="ResumeDivider">{text}</Divider>
    )
};

export default ResumeDivider;
