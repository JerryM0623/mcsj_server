const roleService = require('../../../service/back/role/role.service')

class RoleController {
    /**
     * 分页获取角色与权限的数据信息
     * @param ctx
     * @returns {Promise<void>}
     */
    async getByPageNum(ctx) {
        const {pageNum, pageSize} = ctx.request.query;
        if (!pageNum || !pageSize) {
            ctx.body = {
                code: 400,
                msg: '参数错误',
                data: ''
            }
            return;
        }
        const res = await roleService.getRolePermission(pageNum, pageSize);
        if (!res.total) {
            ctx.body = {
                code: 500,
                msg: '查询失败',
                data: ''
            }
        }else {
            ctx.body = {
                code: 200,
                msg: '查询成功',
                data: res
            }
        }
    }

    /**
     * 添加职位
     * @param ctx
     * @returns {Promise<void>}
     */
    async addRole(ctx){
        const { roleName } = ctx.request.body;
        if (!roleName) {
            ctx.body = {
                code: 400,
                msg: '参数错误',
                data: ''
            }
            return;
        }
        const res = await roleService.addRole(roleName);
        if (!res) {
            ctx.body = {
                code: 500,
                msg: '添加失败',
                data: ''
            }
        }else {
            ctx.body = {
                code: 200,
                msg: '添加成功',
                data: ''
            }
        }
    }

    /**
     * 获取全部职位信息
     * @param ctx
     * @returns {Promise<void>}
     */
    async getAllRole(ctx){
        const res = await roleService.getAllRole();
        if (res.length <= 0) {
            ctx.body = {
                code: 500,
                msg: '查询失败',
                data: ''
            }
        }else {
            ctx.body = {
                code: 200,
                msg: '查询成功',
                data: res
            }
        }
    }

    async addRolePermission(ctx){
        const { roleValue, permissionValue } = ctx.request.body;
        if (!roleValue || !permissionValue){
            ctx.body = {
                code: 400,
                msg: '数据有误，请重试',
                data: ''
            }
            return;
        }
        const res = await roleService.addRolePermission(roleValue, permissionValue);
        if (res === 'Error'){
            ctx.body = {
                code: 500,
                msg: '添加失败',
                data: ''
            }
            return;
        }
        if (res === 'Exist'){
            ctx.body = {
                code: 501,
                msg: '已存在该职位与权限的关系',
                data: ''
            }
            return;
        }
        ctx.body = {
            code: 200,
            msg: '建立该职位与权限的关系成功',
            data: ''
        }
    }

    /**
     * 删除权限及其对应权限信息
     * @param ctx
     * @returns {Promise<void>}
     */
    async deleteRole(ctx){
        const { roleValue } = ctx.request.body;
        if (!roleValue) {
            ctx.body = {
                code: 400,
                msg: '数据有误，请重试',
                data: ''
            }
            return;
        }
        const res = await roleService.deleteRole(roleValue);
        if (!res){
            ctx.body = {
                code: 500,
                msg: '删除失败！',
                data: ''
            }
        }else {
            ctx.body = {
                code: 200,
                msg: '删除职位及其对应权限成功！',
                data: ''
            }
        }
    }

    async deleteRolePermission(ctx){
        const { id } = ctx.request.body;
        console.log(id);
        if (!id) {
            ctx.body = {
                code: 400,
                msg: '数据有误，请重试',
                data: ''
            }
            return;
        }
        const res = await roleService.deleteRolePermission(id);
        if (!res){
            ctx.body = {
                code: 500,
                msg: '删除失败！',
                data: ''
            }
        }else {
            ctx.body = {
                code: 200,
                msg: '删除权限成功！',
                data: ''
            }
        }
    }
}

module.exports = new RoleController();