
export const MAIN_MARGIN = 10
export const MAIN_MARGIN_TOP = 32
export const HEADER_Y = 100 + MAIN_MARGIN_TOP // 头部高度
export const SIDER_LEFT_X = 200 + MAIN_MARGIN // 左边宽度


export const getStyle = (data: any) => {
    const changeDataList = ["top", "left", "width", "height", "fontSize"]
    changeDataList.forEach((val) => {
        if (data[val]) {
            data[val] = data[val] + "px"
        }
    })
    return data
}



// module.exports = () => { getStyle }