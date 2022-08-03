import ResumeText from "./ResumeText"
import ResumeDivider from "./ResumeDivider"
import ResumeImg from "./ResumeImg"

const componentList: Array<any> = [
    {
        component: (data: any) => <ResumeText {...data} />,
        componentId: 0,
        label: "文本",
        propValue: {
            text: "内容"
        },
        style: {
            width: 50,
            height: 22,
            fontSize: 14,
            fontWeight: 100,
            backgroundColor: null,
            textAlign: 'center', 
            color: null,
        },
    },
    {
        component: (data: any) => <ResumeDivider {...data} />,
        componentId: 1,
        label: "分割线",
        propValue: {
            text: "内容",
            orientation: "center",
            type: "horizontal"
        },
        style: {
            width: 50,
            height: 22,
            fontSize: 14,
            fontWeight: 100,
            backgroundColor: 'rgba(0,0,0,0)',
            textAlign: 'center', 
            color: null,
        },
    },
    {
        component: (data: any) => <ResumeImg {...data} />,
        componentId: 2,
        label: "图片",
        propValue: {
            src: ""
        },
        style: {
            width: 50,
            height: 22,
            fontSize: 14,
            fontWeight: 100,
            backgroundColor: 'rgba(0,0,0,0)',
            textAlign: 'center', 
            color: null,
        },
    },

]




export default componentList


