/**
 * 后台管理接口的 controller
 */
const service = require('../service/index');
class backController {
    async login(ctx){
        try{
            const {account, password} = ctx.request.body;
            const res = await service.backService.checkAccount(account, password);
            if(res === 1){
                ctx.status = 500;
                ctx.body = {
                    code:500,
                    msg:'当前登录账号暂未注册',
                    data:''
                }
            }
            if(res === 2){
                ctx.status = 400;
                ctx.body = {
                    code:400,
                    msg:'密码错误，请重新输入',
                    data:''
                }
            }
            if(res === 3){
                ctx.status = 200;
                ctx.body = {
                    code:200,
                    msg:'ok',
                    data:{
                        token:'111'
                    }
                }
            }
        }catch (err){
            ctx.status = 500
            ctx.body = {
                code:500,
                msg:'登录失败',
                data:''
            }
        }

    }
}
module.exports = new backController();