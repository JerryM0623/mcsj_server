/**
 * 后台管理接口的 controller
 */
const jwt = require('jsonwebtoken');

const service = require('../service/index');
const { JWT_KEY } = require('../config/config.default')
const { fillImgLink } = require('../utils/fillImgLink.utils');

class backController {
    /**
     * login 控制器 -> 实现登录功能
     * @param ctx
     * @returns {Promise<void>}
     */
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
                        token:jwt.sign({account,password},JWT_KEY)
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

    /**
     * getUserInfo 控制器 -> 实现用户详细信息的获取
     * @param ctx
     * @returns {Promise<void>}
     */
    async getUserInfo(ctx){
        try{
            const { account } = ctx.query;
            const res = await service.backService.getUserInfo(account);
            res.account = account;
            const newRes = fillImgLink(res);
            ctx.body = {
                code:20000,
                msg:'获取信息成功',
                data:JSON.stringify(newRes)
            }
        }catch (err) {
            ctx.body = {
                code:20003,
                msg:'Error！！！',
                data:JSON.stringify(err)
            }
        }
    }

    /**
     * getAllAccountInfo 控制器 -> 实现获取所有用户的数据
     * @param ctx
     * @returns {Promise<void>}
     */
    async getAllAccountInfo(ctx){
        try{
            // 直接让 service 层进行数据库的处理
            const res = await service.backService.getAllAccounts();
            ctx.body = {
                code:30000,
                msg:'查询成功',
                data:res
            }
        }catch (err){
            ctx.body = {
                code:30001,
                msg:'查询失败',
                data:err
            }
        }
    }
}
module.exports = new backController();