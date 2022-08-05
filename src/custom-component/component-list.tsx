import ResumeText from "./ResumeText"
import ResumeDivider from "./ResumeDivider"
import ResumeImg from "./ResumeImg"
import ResumeCard from "./ResumeCard"
import ResumeProgress from "./ResumeProgress"

const componentList: Array<any> = [
    {
        component: (data: any) => <ResumeText {...data} />,
        componentId: 0,
        label: "文本",
        propValue: {
            text: "内容",
            icon: ""
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
            icon: "",
            orientation: "center",
            type: "horizontal"
        },
        style: {
            width: 50,
            height: 22,
            fontSize: 14,
            fontWeight: 100,
            backgroundColor: 'rgba(0,0,0,0)',
            color: null,
        },
    },
    {
        component: (data: any) => <ResumeImg {...data} />,
        componentId: 2,
        label: "图片",
        propValue: {
            src: "",
            circle: "",
        },
        style: {
            width: 50,
            height: 22,
        },
    },
    {
        component: (data: any) => <ResumeCard {...data} />,
        componentId: 3,
        label: "卡片",
        propValue: {
            text: "主内容",
            title: "主标题",
            icon: "",
            secondaryTitle: "次标题",
            description: "次内容",
            avatar: "",
            cover: "",
        },
        style: {
            width: 50,
            height: 22,
            textAlign: 'left',
        },
    },
    {
        component: (data: any) => <ResumeProgress {...data} />,
        componentId: 4,
        label: "进度条",
        propValue: {
            text: "内容",
            type: "line",
            percent: 0,
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

]




export default componentList


