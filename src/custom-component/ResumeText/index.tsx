import React, { FC } from 'react';
import iconConfig from "../../utils/icon-config";
import './index.css';
interface ResumeTextProps {
    text: string;
    icon: string;
}
const ResumeText: FC<ResumeTextProps> = (props: ResumeTextProps) => {
    const { text, icon } = props
    const IconComponent = () => {
        if (icon) {
            return <span style={{ padding: "0px 5px" }}>{iconConfig[icon]()}</span>
        }
        return <span></span>
    }
    // 识别空格符和换行符
    const TextComponent = (): any => {
        return text.split("").map((val, index) => {
            if (val === " ") return <span key={index}>&nbsp;</span>
            if (val === "\n") return <br key={index} />
            return <span key={index}>{val}</span>
        })
    }
    return (
        <div className="ResumeText">
            <IconComponent /><TextComponent />
        </div>
    )
};

export default ResumeText;
