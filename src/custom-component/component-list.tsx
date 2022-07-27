import ResumeText from "./ResumeText"
// const commonStyle = {
//     left: 0,
//     top: 0
// }

const componentList: Array<any> = [
    {
        component: (data: any) => <ResumeText {...data} />,
        componentId: 0,
        label: "文本",
        propValueL: "内容",
        style: {
            width: 50,
            height: 22,
            fontSize: 14,
            fontWeight: 100,
            backgroundColor: null,
            textAlign: 'center',
            color: null,
        },
    }
]




export default componentList


