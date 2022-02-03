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

    /**
     * 编辑一条权限信息
     * @param permissionID
     * @param permissionName
     * @param permissionComment
     * @returns {Promise<boolean>}
     */
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

    /**
     * 删除一条权限信息
     * @param permissionID
     * @returns {Promise<boolean>}
     */
    async deletePermission(permissionID) {
        try {
            const sql = `delete from admin_permission where id = ${permissionID};`;
            await adminPool.execute(sql);
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }
}

module.exports = new PermissionService();