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
            const sql = `insert into admin_roles(name) value ('${ roleName }');`;
            await adminPool.execute(sql);
            return true
        }catch (e) {
            console.log(e);
            return false;
        }
    }
}

module.exports = new RoleService()