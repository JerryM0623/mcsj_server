/* admin的账号管理页面的所有接口的 service 层 */

const adminPool = require('../../../db/adminPool')

class AccountService{
    /**
     * 与数据库通信获取全部职业数据
     * @returns {Promise<*[]|*>}
     */
    async getAllRole(){
        try {
            const sql = `select * from admin_roles;`;
            const res = await adminPool.execute(sql);
            return res[0];
        }catch (e) {
            console.log(e);
            return [];
        }
    }
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

    /**
     * 更新一个账户信息
     * @param id
     * @param account
     * @param password
     * @param role
     * @returns {Promise<void>}
     */
    async updateAccount(id, account, password, role){
        try{
            // 获取 role_id
            const selectIdSql = `select id from admin_roles where name = '${role}';`;
            const res1 = await adminPool.execute(selectIdSql);
            const role_id = res1[0][0].id;
            // 更改 user
            const updateSql = `update admin_users set account = '${account}',password = '${password}' where id = ${id};`
            await adminPool.execute(updateSql);
            // 更改 user_role
            const updateSql2 = `update admin_user_role set role_id = ${role_id} where user_id = ${id};`
            await adminPool.execute(updateSql2);

            return true;
        }catch (e) {
            console.log(e)
            return false;
        }
    }

    /**
     * 删除一个账户
     * @param id
     * @returns {Promise<void>}
     */
    async deleteAccount(id){
        try {
            // 先删 admin_user_role
            const deleteSql = `delete from admin_user_role where user_id = ${ id };`;
            await adminPool.execute(deleteSql);

            // 再删 admin_users
            const deleteSql2 = `delete from admin_users where id = ${ id };`;
            await adminPool.execute(deleteSql2);

            return true;
        }catch (e) {
            console.log(e);
            return false;
        }
    }
}

module.exports = new AccountService();