let OSS = require('ali-oss');

let client = new OSS({
    // yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
    region: 'oss-cn-hangzhou',
    // 阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。
    accessKeyId: 'LTAI5tRQogXPZyoAikXXC1UN',
    accessKeySecret: '4X5o0vtdFJ2K5RsxSfgXWiZJBUOxr8',
    // 填写Bucket名称。
    bucket: 'mcsj-2022'
});

module.exports = client;