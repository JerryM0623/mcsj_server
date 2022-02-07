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
}

module.exports = new accountController();