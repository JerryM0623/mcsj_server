// 获取当前ip
const getIPObj = require('./getIPAddress')


function fillingImgUrl(data) {
    data.map(item => {
        let oldVal = item.img_url;
        item.img_url = `http://${getIPObj.getIPAddress()}:4000${oldVal}`;
        return item;
    })

    return data;
}

module.exports = {
    fillingImgUrl
}