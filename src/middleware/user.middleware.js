/**
 * 检测登录请求携带的 account 和 password 有没有错误
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
const userLoginValidate = async (ctx, next) => {
    const { account, password } = ctx.request.body;
    // 没有输入的话
    if(!account || !password) {
        // 400 代表请求是坏的
        ctx.body = {
            code:10001,
            msg:'请输入账号或者密码！',
            data:''
        }
        return ;
    }

    // 放行
    await next();
}

module.exports = {
    userLoginValidate
}