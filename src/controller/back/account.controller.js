/* admin管理后台账户管理页面所有接口的 controller */
const accountService = require('../../service/back/account.service');

class accountController{
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
}

module.exports = new accountController();