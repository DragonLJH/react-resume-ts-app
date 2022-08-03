import React, { FC } from 'react';
import './index.css';
interface ResumeTextProps {
    text: string
}
const ResumeText: FC<ResumeTextProps> = (props: ResumeTextProps) => {
    const { text } = props
    return (
        <div className="ResumeText">{text}</div>
    )
};

export default ResumeText;
