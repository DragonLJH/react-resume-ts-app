import ResumeText from "./ResumeText"
import ResumeDivider from "./ResumeDivider"
import ResumeImg from "./ResumeImg"
import ResumeCard from "./ResumeCard"
import ResumeProgress from "./ResumeProgress"

export const mateComponent = new Map()
mateComponent.set(0, { component: (data: any) => <ResumeText {...data} /> })
mateComponent.set(1, { component: (data: any) => <ResumeDivider {...data} /> })
mateComponent.set(2, { component: (data: any) => <ResumeImg {...data} /> })
mateComponent.set(3, { component: (data: any) => <ResumeCard {...data} /> })
mateComponent.set(4, { component: (data: any) => <ResumeProgress {...data} /> })

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
            width: 80,
            height: 30,
            fontSize: 14,
            fontWeight: 100,
            backgroundColor: "#fff",
            textAlign: 'center',
            color: "#000",
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
            width: 300,
            height: 30,
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
            width: 300,
            height: 300,
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
            width: 300,
            height: 180,
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
            icon: "",
        },
        style: {
            width: 300,
            height: 70,
            fontSize: 14,
            fontWeight: 100,
            backgroundColor: null,
            textAlign: 'center',
            color: null,
        },
    },

]




export default componentList


