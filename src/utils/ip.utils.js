const ip = require('ip');

const getIPAdress = () => {
    return ip.address();
}

module.exports = {
    getIPAdress
}