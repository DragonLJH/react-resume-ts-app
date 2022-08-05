import React, { FC } from 'react';
import { IconComponent } from "../../utils/icon-config";
import './index.css';
interface ResumeTextProps {
    text: string;
    icon?: string;
}
const ResumeText: FC<ResumeTextProps> = (props: ResumeTextProps) => {
    const { text, icon } = props
    // 识别空格符和换行符 
    const TextComponent = (): any => {
        let flagText = text.split("")
        let newText = []
        let flag = ""
        for (let i = 0; i < flagText.length; i++) { //使内容连续不再被sapn一个个分离
            if (flagText[i] === " ") {
                flag = ""
                newText.push("&nbsp;", "")
                continue
            }
            if (flagText[i] === "\n") {
                flag = ""
                newText.push("\n", "")
                continue
            }
            flag = flag + flagText[i]
            newText.splice(-1, 1, flag)
        }

        return newText.map((val, index) => {
            if (val === "&nbsp;") return <span key={index}>&nbsp;</span>
            if (val === "\n") return <br key={index} />
            return <span key={index}>{val}</span>
        })
    }
    return (
        <div className="ResumeText">
            <IconComponent name={icon ?? ""} /><TextComponent />
        </div>
    )
};

export default ResumeText;
