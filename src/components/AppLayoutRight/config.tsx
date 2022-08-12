import { iconConfig } from "../../utils/icon-config";
import colorConfig from "../../utils/color-config"
const { colors } = colorConfig

// 类型导出需要添加 declare 
export declare type commomType = {
    inputType: string;
    label: string;
    name: string;
}

// 公共样式（x，y，宽，高）
export const commomStyle: any = {
    top: { inputType: "inputNumber", label: "y" },
    left: { inputType: "inputNumber", label: "x" },
    width: { inputType: "inputNumber", label: "宽" },
    height: { inputType: "inputNumber", label: "高" }
}
export const iconAttribute: any = {
    icon: {
        inputType: "select", label: "Icon", chidren: [
            { value: "", label: "", },
            ...Object.keys(iconConfig).map((val: any) => {
                return { value: val, label: val, }
            })
        ]
    }
}
// 配置样式
export const configStyle: any = {
    ...commomStyle,
    backgroundColor: { inputType: "Cascader", label: "背景颜色", chidren: [...colors] },
    color: { inputType: "Cascader", label: "字体颜色", chidren: [...colors] },
    fontSize: { inputType: "inputNumber", label: "字体大小" },
    fontWeight: {
        inputType: "select", label: "字体权重", chidren: [
            { value: "100", label: "100", },
            { value: "200", label: "200", },
            { value: "300", label: "300", },
            { value: "400", label: "400", },
            { value: "500", label: "500", },
            { value: "600", label: "600", },
            { value: "700", label: "700", },
            { value: "800", label: "800", },
            { value: "900", label: "900", },
        ]
    },
    border: { inputType: "input", label: "边框" },
    textAlign: {
        inputType: "select", label: "文本对齐", chidren: [
            { value: "left", label: "左对齐", },
            { value: "center", label: "居中对齐", },
            { value: "right", label: "右对齐", },
        ]
    },
}

// 公共属性（内容）
export const commomAttribute: any = {
    text: { inputType: "textArea", label: "内容" },
}

// 配置属性
// 注意：(select + componentId) 区分可能会相同的属性
export const configAttribute: any = {
    select0: {
        ...commomAttribute,
        ...iconAttribute
    },
    select1: {
        ...commomAttribute,
        ...iconAttribute,
        orientation: {
            inputType: "select", label: "分割线标题的位置", chidren: [
                { value: "left", label: "左", },
                { value: "center", label: "居中", },
                { value: "right", label: "右", },
            ]
        },
        type: {
            inputType: "select", label: "水平/垂直", chidren: [
                { value: "horizontal", label: "水平", },
                { value: "vertical", label: "垂直", },
            ]
        },
    },
    select2: {
        ...commomAttribute,
        src: { inputType: "Upload", label: "上传图片", },
        circle: {
            inputType: "radio", label: "圆", chidren: [
                { value: "1", label: "是", },
                { value: "", label: "否", },
            ]
        }
    },
    select3: {
        ...commomAttribute,
        icon: { ...iconAttribute.icon, label: "主标题Icon" },
        title: { inputType: "input", label: "主标题" },
        avatar: { ...iconAttribute.icon, label: "次标题Icon" },
        secondaryTitle: { inputType: "input", label: "次标题" },
        description: { inputType: "input", label: "内容" },
        cover: { inputType: "Upload", label: "上传封面图", },
    },
    select4: {
        ...commomAttribute,
        ...iconAttribute,
        type: {
            inputType: "select", label: "类型", chidren: [
                { value: "line", label: "进度条", },
                { value: "circle", label: "进度圈", },
                { value: "dashboard", label: "仪表盘", },
            ]
        },
        percent: { inputType: "inputNumber", label: "百分比" },
    },
    select5: {
    },

}