import React, { FC, useMemo, useRef, useState } from 'react';
import { InputNumber, Space, Row, Col } from 'antd';
import './color-panel.css';

export const ColorPanel: FC = () => {
    const colorPanelItem: any = useRef()
    const colorScaleColumn: any = useRef()

    const [hsvH, setHsvH] = useState(0)
    const [rodTop, setRodTop] = useState(0)
    const [rgbColor, setRgbColor] = useState({ R: 0, G: 0, B: 0, A: 0 })

    const colorScaleColumnDown = (event: any) => {
        const { clientY } = event
        const { y } = colorScaleColumn.current.getBoundingClientRect()
        const res = clientY - y
        setHsvH(res * 2)
        setRodTop(res)
    }
    const toRGB = (H: number, S: number, V: number) => {
        let R, G, B, var_r, var_g, var_b;
        if (S == 0) {
            R = V * 255
            G = V * 255
            B = V * 255
        } else {
            let var_h = H / 60
            if (var_h == 6) var_h = 0      //H must be < 1
            let var_i = parseInt(var_h + "")             //Or ... var_i = floor( var_h ) 
            let p = V * (1 - S)
            let q = V * (1 - S * (var_h - var_i))
            let t = V * (1 - S * (1 - (var_h - var_i)))
            if (var_i == 0) { var_r = V; var_g = t; var_b = p }
            else if (var_i == 1) { var_r = q; var_g = V; var_b = p }
            else if (var_i == 2) { var_r = p; var_g = V; var_b = t }
            else if (var_i == 3) { var_r = p; var_g = q; var_b = V }
            else if (var_i == 4) { var_r = t; var_g = p; var_b = V }
            else { var_r = V; var_g = p; var_b = q }
            R = var_r * 255
            G = var_g * 255
            B = var_b * 255
        }

        setRgbColor({ R: parseInt(R + ""), G: parseInt(G + ""), B: parseInt(B + ""), A: 1 })
    }
    const colorPanelItemDown = (event: any) => {
        const { clientX, clientY } = event
        const { x, y } = colorPanelItem.current.getBoundingClientRect()
        const [newX, newY] = [clientX - x, clientY - y]
        toRGB(hsvH, newX / 180, 1 - newY / 180)
    }


    return (<div className="color-panel">
        <div ref={colorPanelItem}
            className="display-inline-block color-panel-item"
            style={{ backgroundColor: `hsl(${hsvH},100%,50%)` }}
            onMouseDown={(event) => colorPanelItemDown(event)}>

        </div>
        <div ref={colorScaleColumn}
            className="display-inline-block color-scale-column"
            onMouseDown={(event) => colorScaleColumnDown(event)}>
            <div className="rod" style={{ top: rodTop }}></div>
        </div>
        <div className="display-inline-block msg">
            <div className="item" style={{ backgroundColor: `rgba(${rgbColor.R},${rgbColor.G},${rgbColor.B},${rgbColor.A})` }}></div>
            <div>
                <Row>
                    <Col span={3}>R</Col>
                    <Col span={21}>
                        <InputNumber style={{ width: "4rem" }} min={0} max={255} value={rgbColor.R} onChange={(val) => { setRgbColor({ ...rgbColor, R: val }) }} />
                    </Col>
                </Row>
                <Row>
                    <Col span={3}>G</Col>
                    <Col span={21}>
                        <InputNumber style={{ width: "4rem" }} min={0} max={255} value={rgbColor.G} onChange={(val) => { setRgbColor({ ...rgbColor, G: val }) }} />
                    </Col>
                </Row>
                <Row>
                    <Col span={3}>B</Col>
                    <Col span={21}>
                        <InputNumber style={{ width: "4rem" }} min={0} max={255} value={rgbColor.B} onChange={(val) => { setRgbColor({ ...rgbColor, B: val }) }} />
                    </Col>
                </Row>
                <Row>
                    <Col span={3}>A</Col>
                    <Col span={21}>
                        <InputNumber style={{ width: "4rem" }} min={0} max={1} value={rgbColor.A} onChange={(val) => { setRgbColor({ ...rgbColor, A: val }) }} />
                    </Col>
                </Row>

            </div>
        </div>


    </div>)
}

