const adminPool = require('../../../db/adminPool');

class PermissionService{
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
}

module.exports = new PermissionService();