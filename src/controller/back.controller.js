/**
 * 后台管理接口的 controller
 */
const jwt = require('jsonwebtoken');
const service = require('../service/index');
const { JWT_KEY } = require('../config/config.default')
class backController {
    async login(ctx){
        try{
            const {account, password} = ctx.request.body;
            const res = await service.backService.checkAccount(account, password);
            if(res === 1){
                ctx.body = {
                    code:10002,
                    msg:'当前登录账号暂未注册',
                    data:''
                }
            }
            if(res === 2){
                ctx.body = {
                    code:10003,
                    msg:'密码错误，请重新输入',
                    data:''
                }
            }
            if(res === 3){
                ctx.body = {
                    code:10000,
                    msg:'登录成功',
                    data:{
                        id:'1',
                        account,
                        token:jwt.sign({account,password},JWT_KEY,{ expiresIn: '1h' })
                    }
                }
            }
        }catch (err){
            ctx.body = {
                code:10004,
                msg:'登录失败',
                data:''
            }
        }

    }
}
module.exports = new backController();