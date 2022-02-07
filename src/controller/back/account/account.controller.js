/* admin管理后台账户管理页面所有接口的 controller */
const accountService = require('../../../service/back/account/account.service');

class accountController{
    /**
     * 分页查询账户信息
     * @param ctx
     * @returns {Promise<void>}
     */
    async getAccountByPageNum(ctx){
        const { pageNum, pageSize } = ctx.request.query;
        if (!pageNum || !pageSize){
            ctx.body = {
                code: 400,
                msg: '参数错误',
                data: ''
            }
            return;
        }
        const res = await accountService.getAccountByPageNum(pageNum, pageSize);
        if (!res.total){
            ctx.body = {
                code: 500,
                msg: '查询失败',
                data: ''
            }
            return;
        }
        ctx.body = {
            code: 200,
            msg: '查询成功',
            data: res
        }
    }

    /**
     * 查询全部账户信息
     * @param ctx
     * @returns {Promise<void>}
     */
    async getAllAccount(ctx){
        const res = await accountService.getAllAccount();
        if (res.length <= 0){
            ctx.body = {
                code: 500,
                msg: '查询失败',
                data:''
            }
        }else {
            ctx.body = {
                code: 200,
                msg: '查询成功',
                data: res
            }
        }
    }

    /**
     * 创建一个新的账户
     * @param ctx
     * @returns {Promise<void>}
     */
    async addAccount(ctx){
        const { account, password } = ctx.request.body;
        if (!account || !password){
            ctx.body = {
                code: 400,
                msg: '参数错误',
                data:''
            }
            return;
        }
        const res = await accountService.addAccount(account, password);
        if (!res){
            ctx.body = {
                code: 500,
                msg: '添加失败',
                data: ''
            }
            return;
        }
        ctx.body = {
            code: 200,
            msg: '添加成功',
            data: ''
        }
    }

    /**
     * 设置账户与权限的对应关系
     * @param ctx
     * @returns {Promise<void>}
     */
    async setAccountRole(ctx){
        const { accountID, roleID } = ctx.request.body;
        if (!accountID || !roleID){
            ctx.body = {
                code: 400,
                msg: '参数错误',
                data:''
            }
            return;
        }
        const res = await accountService.setAccountRole(accountID, roleID);
        if (res === 'error'){
            ctx.body = {
                code: 500,
                msg: '设置失败',
                data: ''
            }
            return;
        }
        if (res === 'exist'){
            ctx.body = {
                code: 501,
                msg: '账户职位信息已存在',
                data: ''
            }
            return;
        }
        ctx.body = {
            code: 200,
            msg: '设置成功',
            data: ''
        }
    }

    /**
     * 删除账户及其职务
     * @param ctx
     * @returns {Promise<void>}
     */
    async deleteAccount(ctx){
        const { accountID } = ctx.request.body;
        if (!accountID){
            ctx.body = {
                code: 400,
                msg: '参数错误',
                data:''
            }
            return;
        }
        const res = await accountService.deleteAccount(accountID);
        if (!res){
            ctx.body = {
                code: 500,
                msg: '删除失败',
                data: ''
            }
            return;
        }
        ctx.body = {
            code: 200,
            msg: '删除成功',
            data: ''
        }
    }
}

module.exports = new accountController();