import React, { FC, useRef, useState } from 'react';
import './color-panel.css';

export const ColorPanel: FC = () => {
    const colorPanelItem: any = useRef()
    const colorScaleColumn: any = useRef()

    const [hsvH, setHsvH] = useState(0)
    const [rodTop, setRodTop] = useState(0)
    const [rgbColor, setRgbColor] = useState(`rgba(255,255,255,0)`)

    const colorScaleColumnDown = (event: any) => {
        const { clientY } = event
        const { y } = colorScaleColumn.current.getBoundingClientRect()
        const res = clientY - y
        setHsvH(res * 2)
        setRodTop(res)
    }
    const toRGB = (h: number, s: number, v: number) => {
        let rH, rG, rB;
        let a, f, p, q, t;
        a = parseInt((h / 60).toFixed(0))
        f = h / 60 - a
        p = v * (1 - s)
        q = v * (1 - f * s)
        t = v * (1 - (1 - f) * s)
        if (a = 0) [rH, rG, rB] = [v, t, p]
        if (a = 1) [rH, rG, rB] = [q, v, p]
        if (a = 2) [rH, rG, rB] = [p, v, t]
        if (a = 3) [rH, rG, rB] = [p, q, v]
        if (a = 4) [rH, rG, rB] = [t, p, v]
        if (a = 5) [rH, rG, rB] = [v, p, q]
        setRgbColor(`rgb(${rH},${rG},${rB})`)
        console.log([rH, rG, rB])
    }
    const colorPanelItemDown = (event: any) => {
        const { clientX, clientY } = event
        const { x, y } = colorPanelItem.current.getBoundingClientRect()
        const [newX, newY] = [clientX - x, clientY - y]
        toRGB(hsvH, newX / 180, newY / 180)
        console.log(clientX - x, clientY - y)
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
            <div className="item" style={{ backgroundColor: rgbColor }}></div>
        </div>


    </div>)
}

