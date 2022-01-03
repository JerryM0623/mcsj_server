const { getIPAdress } = require('./ip.utils')

/**
 *
 * @param dataObj -> 数据对象，类型为 Obj
 * @returns {*} -> 返回的数据，类型为Obj
 */
const fillImgLink = (dataObj) => {
    const oldAdress = dataObj.user_avatar;
    return {
        ...dataObj,
        user_avatar: `http://${getIPAdress()}:4000${oldAdress}`
    }
}

module.exports = {
    fillImgLink
}