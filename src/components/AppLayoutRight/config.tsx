import iconConfig from "../../utils/icon-config";

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
export const iconStyle: any = {
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
    backgroundColor: { inputType: "input", label: "背景颜色" },
    color: { inputType: "input", label: "字体颜色" },
    fontSize: { inputType: "input", label: "字体大小" },
    fontWeight: { inputType: "input", label: "字体权重" },
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
        ...iconStyle
    },
    select1: {
        ...commomAttribute,
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
        src: { inputType: "Upload", label: "上传图片", }
    },

}