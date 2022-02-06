const adminPool = require('../.././../db/adminPool');

class RoleService{
    /**
     * 与数据库交互查询角色权限信息
     * @param pageNum
     * @param pageSize
     * @returns {Promise<*[]|*>}
     */
    async getRolePermission(pageNum, pageSize){
        try{
            const sqlCount = `select COUNT(*) as total from admin_role_permission;`
            const resCount = await adminPool.execute(sqlCount);
            const sql =
                `select rp.id as rolePermissionID, r.name as roleName, p.comment as Permission 
                from admin_roles as r, admin_permission as p, admin_role_permission as rp 
                where r.id = rp.role_id 
                and  
                p.id = rp.permission_id 
                limit ${ pageSize }
                offset ${ pageSize * (pageNum - 1) };`;

            const res = await adminPool.execute(sql);
            return {
                total: resCount[0][0].total,
                list: res[0]
            }
        }catch (e) {
            console.log(e);
            return {};
        }
    }

    /**
     * 添加职位
     * @param roleName
     * @returns {Promise<boolean>}
     */
    async addRole(roleName) {
        try {
            const sql = `insert into admin_roles(name) value ('${roleName}');`;
            await adminPool.execute(sql);
            return true
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    /**
     * 获取全部职位数据
     * @returns {Promise<*[]|*>}
     */
    async getAllRole(){
        try {
            const sql = 'select * from admin_roles;';
            const res = await adminPool.execute(sql);
            return res[0];
        }catch (e) {
            console.log(e);
            return [];
        }
    }

    /**
     * 添加职位和权限之间的对应关系
     * @param roleValue
     * @param permissionValue
     * @returns {Promise<string>}
     */
    async addRolePermission(roleValue, permissionValue){
        try {
            const getRoleIdSql = `select id from admin_roles where name = '${ roleValue }';`;
            const getPermissionIdSql = `select id from admin_permission where name = '${ permissionValue }';`;

            const roleRes = await adminPool.execute(getRoleIdSql);
            const permissionRes = await adminPool.execute(getPermissionIdSql);

            const roleId = roleRes[0][0].id;
            const permissionId = permissionRes[0][0].id;

            const checkSql = `select * from admin_role_permission where role_id = ${ roleId } and permission_id = ${ permissionId };`;
            const checkRes = await adminPool.execute(checkSql);
            const isExist = checkRes[0].length !== 0;

            if (!isExist) {
                const addSql = `insert into admin_role_permission (role_id, permission_id) value (${ roleId }, ${ permissionId });`;
                await adminPool.execute(addSql);
                return 'Success';
            }

            return 'Exist';
        }catch (e) {
            console.log(e);
            return 'Error';
        }
    }

    /**
     * 删除职位及其对应权限信息
     * @param roleValue
     * @returns {Promise<boolean>}
     */
    async deleteRole(roleValue) {
        try{
            const deleteRolePermissionsSql = `delete from admin_role_permission where role_id = ${ roleValue };`;
            await adminPool.execute(deleteRolePermissionsSql);

            const deleteRoleSql = `delete from admin_roles where id = ${ roleValue };`;
            await adminPool.execute(deleteRoleSql);

            return true;
        }catch (e) {
            console.log(e);
            return false;
        }
    }

    async deleteRolePermission(id){
        try {
            const deleteRolePermissionSql = `delete from admin_role_permission where id = ${ id };`;
            await adminPool.execute(deleteRolePermissionSql);
            return true;
        }catch (e) {
            console.log(e);
            return false;
        }
    }
}

module.exports = new RoleService()