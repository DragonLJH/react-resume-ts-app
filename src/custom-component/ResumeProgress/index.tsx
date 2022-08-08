import React, { FC } from 'react';
import { Progress } from 'antd';
import ResumeText from "../ResumeText"
import './index.css';
interface ResumeProgressProps {
    text: string;
    percent: number;
    icon?: string;
    type?: "circle" | "line" | "dashboard";
}
const ResumeProgress: FC<ResumeProgressProps> = (props: ResumeProgressProps) => {
    const { text, percent, type, icon } = props
    return (
        <div className="ResumeProgress">
            <div>{type === "line" ? <ResumeText {...{ text, icon }} /> : ""}</div>
            <div><Progress type={type} percent={percent} format={(percent) => {
                if (type !== "line") return (
                    <div>
                        <div><ResumeText {...{ text, icon }} /></div>
                        <div>{`${percent}%`}</div>
                    </div>
                )
                return `${percent}% `
            }} /></div>
        </div>
    )
};

export default ResumeProgress;
