import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { InputNumber, Button, Row, Col } from 'antd';
import './color-panel.css';

type rgbaType = {
    R: number;
    G: number;
    B: number;
    A: number;
}


type colorProps = {
    rabg: rgbaType;
    setRgba: any;
    showColorPanel: any;
}

export const ColorPanel: FC<colorProps> = (props: colorProps) => {
    const { rabg, setRgba, showColorPanel } = props

    const colorPanelItem: any = useRef()
    const colorScaleColumn: any = useRef()
    const [hsvH, setHsvH] = useState(0)
    const [rodTop, setRodTop] = useState(0)
    const [rgbColor, setRgbColor] = useState({ R: 0, G: 0, B: 0, A: 0 })
    const [targetVal, setTargetVal] = useState({ top: "0px", left: "0px" })

    useEffect(() => {
        setRgbColor(rabg)
    }, [])

    const closeColorPanel = () => {
        showColorPanel()
        setRgba(rgbColor)
    }

    const colorScaleColumnDown = (event: any) => {
        const { clientY } = event
        const { y } = colorScaleColumn.current.getBoundingClientRect()
        const res = clientY - y
        setHsvH(res * 2)
        setRodTop(res)
    }


    // RGB 和 HSV 之间的转化公式是在 http://www.easyrgb.com/en/math.php 获取

    /**
     * 
     * @param H 色相 
     * @param S 饱和度
     * @param V 明度
     */
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

    const toHSV = (props: any) => {
        let { R, G, B }: { R: number, G: number, B: number } = props
        //R, G and B input range = 0 ÷ 255
        //H, S and V output range = 0 ÷ 1.0
        let H = 0, S = 0, V = 0;
        let var_R = (R / 255)
        let var_G = (G / 255)
        let var_B = (B / 255)

        let var_Min = Math.min(var_R, var_G, var_B)      //Min. value of RGB
        let var_Max = Math.max(var_R, var_G, var_B)    //Max. value of RGB
        let del_Max = var_Max - var_Min             //Delta RGB value

        V = var_Max

        if (del_Max == 0)                     //This is a gray, no chroma...
        {
            H = 0
            S = 0
        }
        else                                    //Chromatic data...
        {
            S = del_Max / var_Max

            let del_R = (((var_Max - var_R) / 6) + (del_Max / 2)) / del_Max
            let del_G = (((var_Max - var_G) / 6) + (del_Max / 2)) / del_Max
            let del_B = (((var_Max - var_B) / 6) + (del_Max / 2)) / del_Max

            if (var_R == var_Max) H = del_B - del_G
            else if (var_G == var_Max) H = (1 / 3) + del_R - del_B
            else if (var_B == var_Max) H = (2 / 3) + del_G - del_R

            if (H < 0) H += 1
            if (H > 1) H -= 1
        }
        H *= 360
        setHsvH(H)
        setRodTop(H / 2)

        setTargetVal({ top: `${(1 - V) * 180}px`, left: `${S * 180}px` })
        console.log({ H, S, V })
        return { H, S, V }
    }


    const colorPanelItemDown = (event: any) => {
        const { clientX, clientY } = event
        const { x, y } = colorPanelItem.current.getBoundingClientRect()
        const [newX, newY] = [clientX - x, clientY - y]
        setTargetVal({ top: `${newY}px`, left: `${newX}px` })
        toRGB(hsvH, newX / 180, 1 - newY / 180)
    }

    const inputChange = (val: number, RgbTarget: string) => {
        switch (RgbTarget) {
            case "R": setRgbColor({ ...rgbColor, R: val })
                toHSV({ ...rgbColor, R: val })
                break;
            case "G": setRgbColor({ ...rgbColor, G: val })
                toHSV({ ...rgbColor, G: val })
                break;
            case "B": setRgbColor({ ...rgbColor, B: val })
                toHSV({ ...rgbColor, B: val })
                break;
            default: setRgbColor({ ...rgbColor, A: val })
                break;
        }
    }


    return (
        <div className="color-main">
            <div className="color-panel">
                <div ref={colorPanelItem}
                    className="display-inline-block color-panel-item"
                    style={{ backgroundColor: `hsl(${hsvH},100%,50%)` }}
                    onMouseDown={(event) => colorPanelItemDown(event)}>
                    <div className="target" style={targetVal}></div>
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
                                <InputNumber style={{ width: "4rem" }} min={0} max={255} value={rgbColor.R} onChange={(val) => { inputChange(val, "R") }} />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={3}>G</Col>
                            <Col span={21}>
                                <InputNumber style={{ width: "4rem" }} min={0} max={255} value={rgbColor.G} onChange={(val) => { inputChange(val, "G") }} />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={3}>B</Col>
                            <Col span={21}>
                                <InputNumber style={{ width: "4rem" }} min={0} max={255} value={rgbColor.B} onChange={(val) => { inputChange(val, "B") }} />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={3}>A</Col>
                            <Col span={21}>
                                <InputNumber style={{ width: "4rem" }} min={0} max={1} value={rgbColor.A} onChange={(val) => { inputChange(val, "A") }} />
                            </Col>
                        </Row>

                    </div>
                    <div>
                    </div>
                </div>


            </div>
            <div>
                <Button type="primary" onClick={closeColorPanel} >
                    确认
                </Button>
            </div>
        </div>)
}

