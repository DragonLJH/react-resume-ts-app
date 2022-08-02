import React, { FC } from 'react';
import './index.css';
interface ResumeTextProps {
    propValuel: string
}
const ResumeText: FC<ResumeTextProps> = (props: ResumeTextProps) => {
    return (
        <div className="ResumeText">{props.propValuel}</div>
    )
};

export default ResumeText;
