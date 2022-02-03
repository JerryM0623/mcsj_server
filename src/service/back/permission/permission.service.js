const adminPool = require('../../../db/adminPool');

class PermissionService {
    /**
     * 获取全部权限信息的数据库操作函数
     * @param pageSize 每页的大小
     * @param pageNum  需要查询的页数
     * @returns {Promise<{total: *, data: *}|{}>}
     */
    async getByPageNum(pageSize, pageNum) {
        try {
            // 查询 count
            const countSql = `select COUNT(name) as total from admin_permission;`;
            const total = await adminPool.execute(countSql);
            // 查询权限信息
            const sql = `select id as permissionID, name as permissionName, comment as permissionComment from admin_permission limit ${pageSize} offset ${(pageNum - 1) * pageSize};`;
            const res = await adminPool.execute(sql);
            return {
                total: total[0][0].total,
                data: res[0]
            }
        } catch (e) {
            console.log(e);
            return {};
        }
    }

    /**
     * 添加权限信息
     * @param permissionName
     * @param permissionComment
     * @returns {Promise<boolean>}
     */
    async addPermission(permissionName, permissionComment) {
        try {
            const sql = `insert into admin_permission (name, comment) value ('${permissionName}', '${permissionComment}');`;
            await adminPool.execute(sql);
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    async editPermission(permissionID, permissionName, permissionComment) {
        try {
            const sql = `update admin_permission set name = '${permissionName}', comment = '${permissionComment}' where id = ${permissionID};`;
            await adminPool.execute(sql);
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    // /**
    //  * 添加一条权限信息的service层函数
    //  * @param permission_name
    //  * @returns {Promise<boolean>}
    //  */
    // async submitPermission(permissionData){
    //     if (!permissionData.permissionName || permissionData.permissionName.length <= 0 || !permissionData.permissionComment || permissionData.permissionComment.length <= 0) return false;
    //     try {
    //         if (!permissionData.id){
    //             // add
    //             const sql = `insert into admin_permission(name, comment) value ('${permissionData.permissionName}','${permissionData.permissionComment}');`;
    //             await adminPool.execute(sql);
    //             return true;
    //         }else {
    //             // edit
    //             const sql = `update admin_permission set name = '${ permissionData.permissionName }', comment = '${ permissionData.permissionComment }' where id = ${ permissionData.id };`;
    //             await adminPool.execute(sql);
    //             return true;
    //         }
    //     }catch (e) {
    //         console.log(e);
    //         return false;
    //     }
    // }
    //
    // /**
    //  * 根据 id 和 permission_name 更新数据库的信息
    //  * @param id
    //  * @param permission_name
    //  * @returns {Promise<boolean>}
    //  */
    // async editPermission(id, permission_name){
    //     if (!permission_name || permission_name.length <= 0 || !id || id === ''){
    //         return false;
    //     }
    //     try{
    //         const sql = `update admin_permission set name = '${permission_name}' where id = ${id};`;
    //         await adminPool.execute(sql);
    //         return true;
    //     }catch (e) {
    //         console.log(e);
    //         return false;
    //     }
    // }
    //
    // /**
    //  * 根据 id 进行数据删除的 service 层函数
    //  * @param id
    //  * @returns {Promise<boolean>}
    //  */
    // async deletePermission(id){
    //     if (!id || id === ''){
    //         return false;
    //     }
    //     try{
    //         const sql = `delete from admin_permission where id = ${id};`;
    //         await adminPool.execute(sql);
    //         return true;
    //     }catch (e) {
    //         console.log(e);
    //         return false;
    //     }
    // }
}

module.exports = new PermissionService();