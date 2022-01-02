/**
 * 后台管理接口的 controller
 */
class backController {
    async login(ctx){
        ctx.body = '登录成功';
    }
}
module.exports = new backController();