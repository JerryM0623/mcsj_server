/**
 * 后台管理接口的 controller
 */
const service = require('../service/index');
class backController {
    async login(ctx){
        const {username, password} = ctx.request.body;
        const res = await service.backService.checkUser(username, password);
        if (res){
            ctx.body = ctx.request.body;
            return;
        }
        ctx.body = '登录失败'
    }
}
module.exports = new backController();