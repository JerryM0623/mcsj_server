// 获取本机 ip 地址

function getIPAddress(){
    let interfaces = require('os').networkInterfaces();
    for(let devName in interfaces){
        let interfaceName = interfaces[devName];
        for(let i=0;i<interfaceName.length;i++){
            let alias = interfaceName[i];
            if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
                return alias.address;
            }
        }
    }
}

module.exports = {getIPAddress}