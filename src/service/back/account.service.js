/* admin的账号管理页面的所有接口的 service 层 */

const adminPool = require('../../db/adminPool')

class AccountService{
    /**
     * 像数据库请求所有 accounts 的信息
     * @returns {Promise<void>}
     */
    async getAllAccounts() {
        const sql = 'select u.id , u.account, u.password, r.name as role from admin_users as u , admin_roles as r , admin_user_role as ur where u.id = ur.user_id && ur.role_id = r.id;'
        const res = await adminPool.execute(sql);
        return res[0].length !== 0 ? res[0] : []
    }
}

module.exports = new AccountService();