
export const HEADER_Y = 100  // 头部高度
export const SIDER_LEFT_X = 200  // 左边宽度


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