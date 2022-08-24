import { FC, useEffect, useState } from 'react';
import { Select, Input, InputNumber, Upload, Image, Radio, Space, Row, Col } from 'antd';
const { Option, OptGroup } = Select;
const { TextArea } = Input;

interface FormTypeObj {
    inputType: string;
    value?: any;
    onChange?: any;
    chidren?: Array<SelectObj>;
}
interface SelectObj {
    value: string;
    label: string;
}

// 自定义表单控件，根据提供的inputType来对应生成表单控件
const formTypeConfig: any = {
    "input": (val: any, set: any) => <Input value={val} onChange={(e) => set(e.target.value)} />,
    "textArea": (val: any, set: any) => <TextArea value={val} onChange={(e) => set(e.target.value)} />,
    "inputNumber": (val: any, set: any) => <InputNumber min={1} value={val} onChange={set} />,
    "select": (val: any, set: any, props: Array<SelectObj>) => {
        return (<Select value={val} onChange={set} >
            {props.map((item: SelectObj) => {
                return <Option key={item.value} value={item.value}>{item.label}</Option>
            })}
        </Select>)
    },
    "Upload": (val: any, set: any) => {
        return (
            <Upload maxCount={1} onChange={(e) => { if (e.file.status === "done") set(e.file.response) }} onRemove={(file: any) => set("")}
                name="uploadRotationImg" action="http://150.158.96.29:8781/rotation/uploadRotationImg" listType="picture">
                <Image preview={false} src={val} fallback="http://150.158.96.29:8082/commom-img/error.png" />
            </Upload>
        )
    },
    "radio": (val: any, set: any, props: Array<SelectObj>) => {
        return (
            <>
                <Radio.Group onChange={set} defaultValue={val}>
                    {props.map((item: SelectObj) => {
                        return <Radio.Button defaultChecked key={item.value} value={item.value}>{item.label}</Radio.Button>
                    })}
                </Radio.Group>
            </>
        )
    },
    "SelectColor": (val: any, set: any, props: Array<SelectObj>) => {
        return (<Select value={val} onChange={set}>
            {props.map((item: any) => {
                return (
                    <OptGroup key={item.value} label={item.label}>
                        {item.children.map((res: any, index: number) => {
                            return (<Option value={res.value} key={item.value + index}>
                                <div style={{ backgroundColor: res.value }}>{res.label}</div>
                            </Option>)
                        })}
                    </OptGroup>
                )
            })}
        </Select>)
    },
    "BorderSelect": (val: any, set: any, props: any) => {
        if (val) {
            let [resStyle, resWidth, resColor] = val.split(" ") 
            const setResColor = (data: any) => {
                let res = [resStyle, resWidth, data].join(" ")
                set(res)
            }
            const setResWidth = (data: any) => {
                let res = [resStyle, `${data}px`, resColor].join(" ")
                set(res)
            }
            const setResStyle = (data: any) => {
                let res = [data, resWidth, resColor].join(" ")
                set(res)
            }
            return (
                <Row justify="space-around">
                    <Col span={9}>{formTypeConfig.select(resStyle, setResStyle, props.style)}</Col>
                    <Col span={9}>{formTypeConfig.SelectColor(resColor, setResColor, props.color)}</Col>
                    <Col span={5}>{formTypeConfig.inputNumber(Number.parseInt(resWidth), setResWidth)}</Col>
                </Row>
            )

        }

    }

}

// 自定义表单控件
// 需要 提供受控属性 value，提供 onChange 事件
// Antd Form.Item 说明
// 被设置了 name 属性的 Form.Item 包装的控件，表单控件会自动添加 value onChange ，数据同步将被 Form 接管，这会导致以下结果：
// 1、你不再需要也不应该用 onChange 来做数据收集同步（你可以使用 Form 的 onValuesChange），但还是可以继续监听 onChange 事件。
// 2、你不能用控件的 value 或 defaultValue 等属性来设置表单域的值，默认值可以用 Form 里的 initialValues 来设置。
//    注意 initialValues 不能被 setState 动态更新，你需要用 setFieldsValue 来更新。
// 3、你不应该用 setState，可以使用 form.setFieldsValue 来动态改变表单值。
const FormType: FC<FormTypeObj> = (props: FormTypeObj) => {
    const { inputType, chidren, value, onChange } = props  // value 由设置了 name 属性的Form.Item自动添加 
    const [val, setVal] = useState(value)
    useEffect(() => {
        setVal(value)
    }, [value])
    const setFun = (val: any) => {
        onChange(val)  // onChange 事件 由设置了 name 属性的Form.Item自动添加，修改的值同步到 form
        setVal(val)
    }

    return (formTypeConfig[inputType](val, setFun, chidren))
}


export default FormType;