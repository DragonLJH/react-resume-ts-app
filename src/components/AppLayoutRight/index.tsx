import React, { FC, useContext, useEffect, useMemo, useState } from 'react';
import { Form, Empty, Divider, Collapse } from 'antd';
import './index.css';
import commonContext from "../../commonContext";
import type { commomType } from "./config"; // 自定义表单控件
import { configStyle, configAttribute } from "./config";    // 对应配置属性 {inputType , label }
import FormType from "./FormType";
// import { ColorPanel } from "./ColorPanel";

const { Panel } = Collapse;
const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
};

const AppLayoutRight: FC = () => {
    const myAuth: any = useContext(commonContext);

    // 创建的 form 控制实例 （不可以在if里面创建）
    const [formStyle] = Form.useForm();
    const [formAttribute] = Form.useForm();

    useEffect(() => {
        if (myAuth.state.selectComponentIndex !== -1) {  // selectComponentIndex不等于-1代表被选中 
            formStyle.setFieldsValue(myAuth.state.selectComponent.style)  // 给form 控制实例 设置表单的值
            formAttribute.setFieldsValue(myAuth.state.selectComponent.propValue)  // 给form 控制实例 设置表单的值
        }
    })

    // const setRgba = (data: any) => {
    //     console.log("setRgba", data)
    // }
    // const showColorPanel = (data: any) => {
    //     console.log("showColorPanel", data)
    // }

    if (myAuth.state.selectComponentIndex !== -1) {
        const { style, propValue, componentId } = myAuth.state.selectComponent
        let selectConfigAttribute = configAttribute["select" + componentId]
        let newSelectComponent = { ...myAuth.state.selectComponent }
        let index = myAuth.state.selectComponentIndex
        const styleKeys = Object.keys(style)
        let newStyleKeys: Array<commomType> = styleKeys.map((name) => {
            return { ...configStyle[name], name }
        })
        const propValueKeys = Object.keys(propValue)
        let newPropValueKeys: Array<commomType> = propValueKeys.map((name) => {
            return { ...selectConfigAttribute[name], name }
        })
        if (componentId === 5) newPropValueKeys = []
        const onValuesStyleChange = (changedValues: any, allValues: any) => { //字段值更新时触发回调事件(changedValues：修改的字段，allValues：所有值) 
            setComponentData({ ...newSelectComponent, style: allValues }, index)
        };
        const onValuesAttributeChange = (changedValues: any, allValues: any) => { //字段值更新时触发回调事件(changedValues：修改的字段，allValues：所有值)  
            setComponentData({ ...newSelectComponent, propValue: allValues }, index)
        };

        const setComponentData = (data: any, index: number) => { // 更新state数据
            let newComponentData = [...myAuth.state.componentData]
            newComponentData.splice(index, 1, data)
            myAuth.updataSelectComponent(data)
            myAuth.updataComponentData(newComponentData)
        }

        return (
            <div className="AppLayoutRight">
                <Collapse bordered={false} defaultActiveKey={['1', '2']}>
                    <Panel header="样式" key="1">
                        <Form  {...formItemLayout} form={formStyle} onValuesChange={onValuesStyleChange} size="small" labelWrap>
                            {newStyleKeys.map((item: commomType, index: number) => {
                                return (
                                    <Form.Item name={item.name} key={index} label={item.label}>
                                        <FormType {...item} />
                                    </Form.Item>
                                )
                            })}
                        </Form>
                    </Panel>
                    <Panel header="属性" key="2">
                        <Form {...formItemLayout} form={formAttribute} onValuesChange={onValuesAttributeChange} size="small" labelWrap>
                            {newPropValueKeys.map((item: commomType, index: number) => {
                                return (
                                    <Form.Item name={item.name} key={index} label={item.label}>
                                        <FormType {...item} />
                                    </Form.Item>
                                )
                            })}
                        </Form>
                    </Panel>
                </Collapse>
            </div>
        )
    }


    return (
        <div className="AppLayoutRight" style={{}}>
            <Empty description={false} />
            {/* <div>
                <ColorPanel rabg={{ R: 0, G: 0, B: 0, A: 0 }} setRgba={setRgba} showColorPanel={showColorPanel} />
            </div> */}
        </div>
    )
};

export default AppLayoutRight;
