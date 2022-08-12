import React, { FC } from 'react';
import './index.css';


interface ResumeComposeProps {
    resumeCompose: any;
}

const ResumeCompose: FC<ResumeComposeProps> = (props: ResumeComposeProps) => {
    const { resumeCompose } = props
    return resumeCompose.map((res: any, index: number) => {
        return <div key={index} style={{ ...res.style, position: "absolute" }}>
            {res.component(res.propValue)}
        </div>
    })
}

export default ResumeCompose;