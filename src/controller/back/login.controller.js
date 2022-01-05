/* admin管理后台 login 的 controller */

const loginService = require('../../service/back/login.service')

class LoginController{
    /**
     * admin 后台管理 用户登录 控制器 -> 实现用户的登录
     * @param ctx
     * @returns {Promise<void>}
     */
    async login(ctx){
        // 获取数据
        const {
            account,
            password
        } = ctx.request.body;

        // 传递给 service 层
        const res = await loginService.login(account);
        // 验证数据
        if (res === undefined){
            ctx.body = {
                code:404,
                msg:'当前登录账号不存在',
                data:""
            }
            return ;
        }
        if (res.password !== password){
            ctx.body = {
                code:400,
                msg:'密码不正确,请重新输入',
                data:""
            }
            return ;
        }
        ctx.body = {
            code:200,
            msg:'登录成功',
            data:res
        }
    }

}

module.exports = new LoginController();