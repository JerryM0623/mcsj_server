const Ip = require('./ip')
const {PORT} = require('../config/app.config')

class AdminCarouselUtils {

    /**
     * 填充轮播图的 url地址为当前服务器 ip 地址 + 环境变量内的端口号 + 存于数据库中的 url 数据
     * @param data -> 从数据库中获取的数据，是一个伪数组，其实是一个对象，里面的每一个键值对也是一个对象
     * @returns {*}
     */
    fillImgUrl(data) {
        for (let key in data) {
            if (data.hasOwnProperty(key)){
                if (data[key].img_url) {
                    const oldUrl = data[key].img_url;
                    data[key].img_url = `http://${Ip.getIpAdress()}:${PORT}${oldUrl}`;
                }
            }
        }
        return data;
    }

    /**
     * 转换 轮播图的 is_online 属性为 String 值
     * @param data -> 从数据库中获取的数据，是一个伪数组，其实是一个对象，里面的每一个键值对也是一个对象
     * @returns {*}
     */
    transformIsOnline(data) {
        for (let key in data) {
            if (data.hasOwnProperty(key)){
                if (data[key].is_online){
                    data[key].is_online = '已上线'
                }else if (data[key].is_online === 0){
                    data[key].is_online = '未上线';
                }
            }
        }
        return data;
    }
}

module.exports = new AdminCarouselUtils();