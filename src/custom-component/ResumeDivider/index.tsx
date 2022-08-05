import React, { FC } from 'react'; 
import ResumeText from "../ResumeText"
import { Divider } from 'antd';
import './index.css';
interface ResumeDividerProps {
    text: string;
    orientation?: "left" | "right" | "center" | undefined;
    type?: "horizontal" | "vertical" | undefined;
    icon: string;
}
const ResumeDivider: FC<ResumeDividerProps> = (props: ResumeDividerProps) => {
    const { text, orientation, type, icon } = props
    return (
        <Divider type={type} orientation={orientation} className="ResumeDivider">
            <ResumeText {...{ text, icon }} />
        </Divider>
    )
};

export default ResumeDivider;
