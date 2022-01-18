/* admin管理后台账户管理页面所有接口的 controller */
const accountService = require('../../../service/back/account/account.service');

class accountController{
    /**
     * 获取数据库中的全部职业类型
     * @param ctx
     * @returns {Promise<void>}
     */
    async getAllRole(ctx){
        // 向数据库请求数据
        const res = await accountService.getAllRole();
        if (res.length > 0 ){
            ctx.body = {
                code:200,
                msg:'查询成功',
                data:res
            }
        }else {
            ctx.body = {
                code:200,
                msg:'查询成功',
                data:res
            }
        }
    }
    /**
     * 获取数据库中的全部账号信息
     * @param ctx
     * @returns {Promise<void>}
     */
    async getAllAccount(ctx){
        // 直接像数据库请求数据
        const  res = await accountService.getAllAccounts();
        ctx.body = {
            code:200,
            msg:'查询成功',
            data:res
        }
    }

    /**
     * 添加一个账号的接口
     * @param ctx
     * @returns {Promise<void>}
     */
    async addAccount(ctx){
        // 接收数据
        const { account, password, role } = ctx.request.body;
        // 插入数据库
        const res = await accountService.addAccount(account, password, role);
        if (res){
            ctx.body = {
                code:200,
                msg:'添加成功'
            }
        }else {
            ctx.body = {
                code:500,
                msg:'添加失败'
            }
        }
    }

    /**
     * 更新一个账号的信息
     * @param ctx
     * @returns {Promise<void>}
     */
    async updateAccount(ctx){
        // 获取数据
        const { id, account, password, role } = ctx.request.body;
        // 传递给 service 进行数据更新
        const res = await accountService.updateAccount(id, account, password, role);
        if(res){
            ctx.body = {
                code:200,
                msg:"更新完成",
                data:""
            }
        }else{
            ctx.body = {
                code:500,
                msg:"更新失败",
                data:""
            }
        }
    }

    /**
     * 删除一个账户
     * @param ctx
     * @returns {Promise<void>}
     */
    async deleteAccount(ctx){
        // 获取数据
        const { id } = ctx.request.body;
        if (!id){
            ctx.body = {
                code:500,
                msg:"id不存在",
                data:""
            }
            return;
        }
        // 交给 service
        const res = await accountService.deleteAccount(id);
        if (res){
            ctx.body = {
                code:200,
                msg:"删除成功",
                data:""
            }
        }else{
            ctx.body = {
                code:500,
                msg:"删除失败",
                data:""
            }
        }
    }
}

module.exports = new accountController();