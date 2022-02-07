/* admin的账号管理页面的所有接口的 service 层 */

const adminPool = require('../../../db/adminPool')

class AccountService {
    /**
     * 分页查询账户信息
     * @param pageNum
     * @param pageSize
     * @returns {Promise<{}|{total: *, list: *}>}
     */
    async getAccountByPageNum(pageNum, pageSize) {
        try {
            const countSql = `select count(*) as total from admin_user_role;`;
            const countRes = await adminPool.execute(countSql);
            console.log(countRes[0][0].total);

            const selectSql = `select ur.id, u.account, u.password, r.name as role
                                from admin_users as u, admin_roles as r, admin_user_role as ur 
                                where ur.role_id = r.id 
                                and 
                                ur.user_id = u.id
                                limit ${pageSize}
                                offset ${pageSize * (pageNum - 1)};`;
            const selectRes = await adminPool.execute(selectSql);
            console.log(selectRes[0]);
            return {
                total: countRes[0][0].total,
                list: selectRes[0]
            }
        } catch (e) {
            console.log(e);
            return {}
        }
    }

    /**
     * 创建一个新的账户
     * @param account
     * @param password
     * @returns {Promise<boolean>}
     */
    async addAccount(account, password) {
        try{
            const sql = `insert into admin_users(account, password) value ('${ account }', '${ password }');`;
            await adminPool.execute(sql);
            return true;
        }catch (e) {
            console.log(e);
            return false;
        }
    }
}

module.exports = new AccountService();