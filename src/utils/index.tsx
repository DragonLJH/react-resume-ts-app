

export const getStyle = (data: any) => {
    const changeDataList = ["top", "left", "width", "height"]
    changeDataList.forEach((val) => {
        if (data[val]) {
            data[val] = data[val] + "px"
        }
    })
    return data
}



// module.exports = () => { getStyle }