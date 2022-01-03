const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config/config.default')


/**
 * 检测当前请求是否存在 token
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
const requestTokenValidate = async (ctx, next) => {
    // 获取token
    const { authorization } = ctx.request.headers;
    // 校验 token
    if (!authorization){
            ctx.body = {
                code:20001,
                msg:'请携带token进行资源请求',
                data:''
            }
            return ;
    }
    // 放行
    await next();
}

const checkRequestToken = async (ctx, next) => {
    try{
        // 获取 token
        const { authorization } = ctx.request.headers;
        // 同步进行验证
        const decode = jwt.verify(authorization.trim().substr(7),JWT_KEY);
        // 验证通过
        await next();
    }catch (err){
        ctx.body = {
            code:20002,
            msg:'token校验不通过',
            data:JSON.stringify(err)
        }
    }
}

module.exports = {
    requestTokenValidate,
    checkRequestToken
}