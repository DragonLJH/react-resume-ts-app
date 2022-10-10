import { type } from "os";
import { FC } from "react";

type SampleTemplate = {
    templateFun: Function
}


export const SampleTemplate: FC<SampleTemplate> = (props: SampleTemplate) => {
    const { templateFun } = props
    const map = new Map();
    map.set("FIRST_TEMPLATE", [{ "componentId": 2, "label": "图片", "propValue": { "src": "http://150.158.96.29:8082/my-shop-img/uploadRotationImg/6c071e0311ba445d97fd277da2c3b16d.jpeg", "circle": "" }, "style": { "width": 150, "height": 200, "left": 1, "top": 1 }, "id": "component0" }, { "componentId": 0, "label": "文本", "propValue": { "text": "姓名", "icon": "" }, "style": { "width": 170, "height": 40, "fontSize": 24, "fontWeight": "600", "backgroundColor": "#fff", "textAlign": "center", "color": "#000", "borderBottom": " 1px #ccc", "left": 163, "top": 1 }, "id": "component1" }, { "componentId": 0, "label": "文本", "propValue": { "text": "应聘岗位", "icon": "" }, "style": { "width": 170, "height": 40, "fontSize": 20, "fontWeight": "600", "backgroundColor": "#fff", "textAlign": "center", "color": "#000", "borderBottom": " 1px #ccc", "left": 163, "top": 57 }, "id": "component2" }, { "componentId": 0, "label": "文本", "propValue": { "text": "xxx@xxx", "icon": "MailOutlined" }, "style": { "width": 200, "height": 30, "fontSize": 18, "fontWeight": 100, "backgroundColor": "#fff", "textAlign": "left", "color": "#000", "borderBottom": "solid 1px #ccc", "left": 163, "top": 118 }, "id": "component3" }, { "componentId": 0, "label": "文本", "propValue": { "text": "电话xxxx", "icon": "PhoneOutlined" }, "style": { "width": 200, "height": 30, "fontSize": 18, "fontWeight": 100, "backgroundColor": "#fff", "textAlign": "left", "color": "#000", "borderBottom": "solid 1px #ccc", "left": 163, "top": 171 }, "id": "component4" }, { "componentId": 0, "label": "文本", "propValue": { "text": "xxxxxx", "icon": "QqOutlined" }, "style": { "width": 200, "height": 30, "fontSize": 18, "fontWeight": 100, "backgroundColor": "#fff", "textAlign": "left", "color": "#000", "borderBottom": "solid 1px #ccc", "left": 381, "top": 118 }, "id": "component5" }, { "componentId": 0, "label": "文本", "propValue": { "text": "xxxxx", "icon": "HomeOutlined" }, "style": { "width": 200, "height": 30, "fontSize": 18, "fontWeight": 100, "backgroundColor": "#fff", "textAlign": "left", "color": "#000", "borderBottom": "solid 1px #ccc", "left": 381, "top": 171 }, "id": "component6" }, { "componentId": 3, "label": "卡片", "propValue": { "text": "", "title": "工作经验", "icon": "BarsOutlined", "secondaryTitle": "xxx公司", "description": "xxx经历", "avatar": "StarOutlined", "cover": "" }, "style": { "width": 500, "height": 180, "textAlign": "left", "left": 70, "top": 226 }, "id": "component7" }, { "componentId": 3, "label": "卡片", "propValue": { "text": "", "title": "", "icon": "", "secondaryTitle": "xxx公司", "description": "xxx经历", "avatar": "StarOutlined", "cover": "" }, "style": { "width": 500, "height": 130, "textAlign": "left", "left": 70, "top": 406 }, "id": "component8" }, { "componentId": 3, "label": "卡片", "propValue": { "text": "", "title": "项目经历", "icon": "BarsOutlined", "secondaryTitle": "xxx项目", "description": "1.xxx\n2.xxx\n3.xxx", "avatar": "", "cover": "" }, "style": { "width": 501, "height": 180, "textAlign": "left", "left": 69, "top": 545 }, "id": "component9" }, { "componentId": 3, "label": "卡片", "propValue": { "text": "", "title": "", "icon": "", "secondaryTitle": "xxx项目", "description": "1.xxx\n2.xxx\n3.xxx", "avatar": "", "cover": "" }, "style": { "width": 501, "height": 135, "textAlign": "left", "left": 69, "top": 725 }, "id": "component10" }])
    const res = [
        { label: "模板1", json: map.get("FIRST_TEMPLATE") },
    ]
    return (<div>
        {res.map((val: any, index: number) => {
            return (<div key={index} onClick={() => templateFun(val.json)}>
                <div>{val.label}</div>
            </div>)
        })}
    </div>)
}