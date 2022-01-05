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

    /**
     * 添加一个账户
     * @param account -> 账户数据
     * @param password -> 密码数据
     * @param role -> 职位数据
     * @returns {Promise<void>}
     */
    async addAccount(account, password, role){
        try {
            // 添加到 admin_users 表
            const addToUserSql = `insert into admin_users (account, password) VALUE ('${ account }','${ password }');`;
            const insertRes = await adminPool.execute(addToUserSql);

            // 查询 role_id 从 admin_role 表
            const selectRoleIdSql = `select id from admin_roles where name = '${ role }';`;
            const selectRes = await adminPool.execute(selectRoleIdSql);

            // 获取 user_id 和 role_id
            const user_id = insertRes[0].insertId;
            const role_id = selectRes[0][0].id;

            // 添加数据到 admin_user_role 表
            const addToUserRoleSql = `insert into admin_user_role(user_id, role_id) VALUE (${user_id} , ${role_id});`;
            await adminPool.execute(addToUserRoleSql);

            return true ;
        }catch (e) {
            return false;
        }
    }
}

module.exports = new AccountService();