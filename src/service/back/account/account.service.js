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

            const selectSql = `select ur.id, u.account, u.password, r.name as role
                                from admin_users as u, admin_roles as r, admin_user_role as ur 
                                where ur.role_id = r.id 
                                and 
                                ur.user_id = u.id
                                limit ${pageSize}
                                offset ${pageSize * (pageNum - 1)};`;
            const selectRes = await adminPool.execute(selectSql);
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
     * 获取全部的账户信息
     * @returns {Promise<*[]|*>}
     */
    async getAllAccount(){
        try {
            const sql = `select * from admin_users;`;
            const res = await adminPool.execute(sql);
            return res[0];
        }   catch (e) {
            console.log(e);
            return [];
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

    /**
     * 设置账户与职位的对应关系
     * @param accountID
     * @param roleID
     * @returns {Promise<string>}
     */
    async setAccountRole(accountID, roleID){
        try{
            const checkSql = `select COUNT(*) as number from admin_user_role where user_id = ${ accountID };`;
            const checkRes = await adminPool.execute(checkSql);
            if (checkRes[0][0].number === 0){
                const insertSql = `insert into admin_user_role(user_id, role_id) value (${ accountID }, ${ roleID });`;
                await adminPool.execute(insertSql);
                return 'success';
            }
            return 'exist';
        }catch (e) {
            console.log(e);
            return 'error';
        }
    }

    /**
     * 删除账户及其职务
     * @param accountID
     * @returns {Promise<boolean>}
     */
    async deleteAccount(accountID){
        try {
            const deleteRoleSql = `delete from admin_user_role where user_id = ${ accountID };`;
            await adminPool.execute(deleteRoleSql);

            const deleteAccountSql = `delete from admin_users where id = ${ accountID };`;
            await adminPool.execute(deleteAccountSql);

            return true;
        }catch (e) {
            console.log(e);
            return false;
        }
    }

    /**
     * 更新账户数据
     * @param id
     * @param account
     * @param password
     * @param role
     * @returns {Promise<boolean>}
     */
    async edit(id, account, password, role){
        try {
            const selectSql = `select user_id as id from admin_user_role where id = ${ id };`;
            const selectRes = await adminPool.execute(selectSql);
            const accountId = selectRes[0][0].id;

            const editAccountSql = `update admin_users set account = '${ account }', password = '${ password }' where id = ${ accountId };`;
            await adminPool.execute(editAccountSql);

            const selectRoleIdSql = `select id from admin_roles where name = '${ role }';`;
            const selectRoleIdRes = await adminPool.execute(selectRoleIdSql);
            const roleID = selectRoleIdRes[0][0].id;

            const updateRoleSql = `update admin_user_role set role_id = ${ roleID } where id = ${ id };`;
            await adminPool.execute(updateRoleSql);

            return true;
        }catch (e) {
            console.log(e);
            return false;
        }
    }
}

module.exports = new AccountService();