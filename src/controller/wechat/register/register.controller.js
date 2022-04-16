const registerService = require('../../../service/wechat/register/register.service');
const { v4 : uuidV4 } = require('uuid');

class RegisterController{

    /**
     * 注册账户
     * @param ctx
     * @returns {Promise<void>}
     */
    async register(ctx){
        const { username, hashPassword } = ctx.request.body;
        if (username === '' || username.trim().length < 5 || hashPassword === '' || hashPassword === null){
            ctx.body = {
                code: 10004,
                msg: '请求损坏',
                data: ""
            }
        }
        const uuid = uuidV4();
        const res = await registerService.register(uuid, username, hashPassword);
        if (res.status === 'error'){
            ctx.body = {
                code: 10005,
                msg: res.msg,
                data: ""
            }
        } else {
            ctx.body = {
                code: 10006,
                msg: '注册成功',
                data: ""
            }
        }
    }
}

module.exports = new RegisterController();