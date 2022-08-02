import React, { FC, useContext, useEffect, useMemo, useState } from 'react';
import { Form, Result, Input } from 'antd';
import './index.css';
import commonContext from "../../commonContext";
import type { styleType } from "./config"; // 自定义表单控件
import { configStyle } from "./config";    // 对应配置属性 {inputType , label }
import FormType from "./FormType";

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

const AppLayoutRight: FC = () => {
    const myAuth: any = useContext(commonContext);

    // 创建的 form 控制实例 （不可以在if里面创建）
    const [form] = Form.useForm();

    useEffect(() => {
        if (myAuth.state.selectComponentIndex !== -1) {  // selectComponentIndex不等于-1代表被选中
            form.setFieldsValue(myAuth.state.selectComponent.style)  // 给form 控制实例 设置表单的值
        }
    })

    if (myAuth.state.selectComponentIndex !== -1) {
        const { style } = myAuth.state.selectComponent
        const styleKeys = Object.keys(style)
        let newStyleKeys: Array<styleType> = styleKeys.map((name) => {
            return { ...configStyle[name], name }
        })
        const onValuesChange = (changedValues: any, allValues: any) => { //字段值更新时触发回调事件(changedValues：修改的字段，allValues：所有值)
            let newSelectComponent = { ...myAuth.state.selectComponent }
            let index = myAuth.state.selectComponentIndex
            newSelectComponent.style = allValues
            setComponentData(newSelectComponent, index)
        };
        const setComponentData = (data: any, index: number) => { // 更新state数据
            let newComponentData = [...myAuth.state.componentData]
            newComponentData.splice(index, 1, data)
            myAuth.updataSelectComponent(data)
            myAuth.updataComponentData(newComponentData)
        }

        return (
            <div className="AppLayoutRight">
                <Form {...formItemLayout} name="rightForm" form={form} onValuesChange={onValuesChange} >
                    {newStyleKeys.map((item: styleType, index: number) => {
                        return (
                            <Form.Item name={item.name} key={index} label={item.label}>
                                <FormType {...item} />
                            </Form.Item>
                        )
                    })}
                </Form>
            </div>
        )
    }


    return (
        <div className="AppLayoutRight">
            <Result
                title="未选中"
            />
        </div>
    )
};

export default AppLayoutRight;
