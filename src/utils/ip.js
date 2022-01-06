
const ip = require('ip');

class Ip {
    /**
     * 获取服务器当前的 IP 地址
     * @returns {any}
     */
    getIpAdress(){
        return ip.address();
    }
}

module.exports = new Ip();