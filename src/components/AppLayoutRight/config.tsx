
// 类型导出需要添加 declare 
export declare type styleType = {
    inputType: string;
    label: string;
    name: string;
}

// 公共样式（x，y，宽，高）
export const commomStyle: any = {
    top: { inputType: "inputNumber", label: "y" },
    left: { inputType: "inputNumber", label: "x" },
    width: { inputType: "inputNumber", label: "宽" },
    height: { inputType: "inputNumber", label: "高" },
}


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



