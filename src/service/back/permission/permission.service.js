const adminPool = require('../../../db/adminPool');

class PermissionService{
    /**
     * 获取全部权限信息的数据库操作函数
     * @returns {Promise<*[]|*>}
     */
    async getAll(){
        try {
            const sql = `select id, name as permission_name from admin_permission ;`;
            const res = await adminPool.execute(sql);
            return res[0];
        }catch (e){
            console.log(e);
            return [];
        }
    }

    /**
     * 添加一条权限信息的service层函数
     * @param permission_name
     * @returns {Promise<boolean>}
     */
    async addPermission(permission_name){
        if (!permission_name || permission_name.length <= 0){
            return false;
        }
        try {
            const sql = `insert into admin_permission(name) value ('${permission_name}');`;
            await adminPool.execute(sql);
            return true;
        }catch (e) {
            console.log(e);
            return false;
        }
    }

    /**
     * 根据 id 和 permission_name 更新数据库的信息
     * @param id
     * @param permission_name
     * @returns {Promise<boolean>}
     */
    async editPermission(id, permission_name){
        if (!permission_name || permission_name.length <= 0){
            return false;
        }
        try{
            const sql = `update admin_permission set name = '${permission_name}' where id = ${id};`;
            await adminPool.execute(sql);
            return true;
        }catch (e) {
            console.log(e);
            return false;
        }
    }
}

module.exports = new PermissionService();