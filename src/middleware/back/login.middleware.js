/* admin 后台管理系统 login 接口的中间件 */

/**
 * 判断是否存在 account
 * @param ctx
 * @param next
 */
const checkAccount = async (ctx, next) => {
    const { account } = ctx.request.body;
    if(account === null || account === undefined){
        ctx.body = {
            code:400,
            msg:'请输入账号',
            data:""
        }
        return ;
    }
    if (account.length < 6 || account.length > 16){
        ctx.body = {
            code:400,
            msg:'账号的长度在6-16之间哦',
            data:""
        }
        return ;
    }
    await next();
}

/**
 * 判断是否存在 password
 * @param ctx
 * @param next
 */
const checkPassword = async (ctx, next) => {
    const {password} = ctx.request.body;
    if(password === null || password === undefined){
        ctx.body = {
            code:400,
            msg:'请输入密码',
            data:""
        }
        return ;
    }
    if (password.length < 6 || password.length > 16){
        ctx.body = {
            code:400,
            msg:'密码的长度在6-16之间哦',
            data:""
        }
        return ;
    }
    await next();
}

module.exports = {
    checkAccount,
    checkPassword
}
