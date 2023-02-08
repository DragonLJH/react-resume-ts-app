
import { Col, Row, Space } from 'antd';
import { red, volcano, gold, yellow, lime, green, cyan, blue, geekblue, purple, magenta, grey } from '@ant-design/colors';

export declare type colorObj = {
    value: string;
    label: string;
    children?: colorObj[];
}

const whiteblack = ['#fff', '#eee', '#ddd', '#ccc', '#bbb', '#aaa', '#999', '#888', '#777', '#666', '#555', '#444', '#333', '#222', '#111', '#000']

const colorsMap = new Map()
colorsMap.set('red', red)
colorsMap.set('volcano', volcano)
colorsMap.set('gold', gold)
colorsMap.set('yellow', yellow)
colorsMap.set('lime', lime)
colorsMap.set('green', green)
colorsMap.set('cyan', cyan)
colorsMap.set('blue', blue)
colorsMap.set('geekblue', geekblue)
colorsMap.set('purple', purple)
colorsMap.set('magenta', magenta)
colorsMap.set('grey', grey)
colorsMap.set('whiteblack', whiteblack)

const colors = (): colorObj[] => {
    return ['whiteblack', 'red', 'volcano', 'gold', 'yellow', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple', 'magenta', 'grey'].map((item) => {
        let children = colorsMap.get(item)
        children = children.map((val: string) => {
            return { value: val, label: val }
        })
        return { value: item, label: item, children: children }
    })
}

const ColorPanel = () => {
    let arr = []
    for (let i = 0; i <= 4095; i++) {
        arr.push("#" + i.toString(16).padStart(3, '0'))
    }
    return (<Space size={0} wrap style={{ width: "1280px" }}>
        {arr.map((val) => {
            return <div key={val} style={{ backgroundColor: val, width: "5px", height: "5px" }} ></div>
        })}
    </Space>)
}
const colorPanel = () => {
    let arr = []
    for (let i = 0; i <= 4095; i++) {
        arr.push("#" + i.toString(16).padStart(3, '0'))
    }
    return arr
}
export default {
    colors: colors(),
    colorPanel: <ColorPanel />
}