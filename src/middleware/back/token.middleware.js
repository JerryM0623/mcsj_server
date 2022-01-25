/* admin 后台管理系统 token 的中间件 */

const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../../config/app.config')

const checkToken = async (ctx, next) => {
    try{
        const { authorization } = ctx.headers;

        if (!authorization) {
            ctx.body = {
                code:400,
                msg:"token 不存在！",
                data:""
            }
            return;
        }
        await jwt.verify(authorization.substr(7), JWT_KEY);
        await next();
    }catch (e) {
        console.log(e);
        ctx.body = {
            code:500,
            msg:"请重新登录更新token！",
            data:""
        }
    }
}

module.exports = {
    checkToken
}