const loginService = require('../../../service/wechat/login/login.service.js');
const jwt = require('jsonwebtoken');

const { JWT_KEY } = require('../../../config/app.config')

class LoginController{

    /**
     * 登录函数
     * @param ctx
     * @returns {Promise<void>}
     */
    async login(ctx){
        const { username, hashPassword } = ctx.request.body;
        if(!username || username.trim().length < 5 || !hashPassword || hashPassword === ''){
            ctx.body = {
                code: 10007,
                msg: '请求错误',
                data: ""
            }
            return;
        }

        const res = await loginService.login(username, hashPassword);

        if(typeof res === 'string'){
            ctx.body = {
                code: '10008',
                msg: res,
                data: ''
            }
            return;
        }

        ctx.body = {
            code: 10009,
            msg: '登录成功',
            data: {
                ...res,
                token: jwt.sign(res, JWT_KEY, {
                    expiresIn: '1d'
                })
            }
        }

    }
}

module.exports = new LoginController();