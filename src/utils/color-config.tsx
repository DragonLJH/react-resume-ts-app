import { red, volcano, gold, yellow, lime, green, cyan, blue, geekblue, purple, magenta, grey } from '@ant-design/colors';

export declare type colorObj = {
    value: string;
    label: string;
    children?: colorObj[];
}

const white = ['#fff', '#eee', '#ddd', '#ccc', '#bbb', '#aaa', '#999', '#888', '#777', '#666', '#555', '#444', '#333', '#222', '#111', '#000']
const black = ['#000', '#111', '#222', '#333', '#444', '#555', '#666', '#777', '#888', '#999', '#aaa', '#bbb', '#ccc', '#ddd', '#eee', '#fff']

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
colorsMap.set('white', white)
colorsMap.set('black', black)

const colors = (): colorObj[] => {
    return ['white', 'black', 'red', 'volcano', 'gold', 'yellow', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple', 'magenta', 'grey'].map((item) => {
        let children = colorsMap.get(item)
        children = children.map((val: string) => {
            return { value: val, label: val }
        })
        return { value: item, label: item, children: children }
    })
}

export default {
    colors: colors()
}