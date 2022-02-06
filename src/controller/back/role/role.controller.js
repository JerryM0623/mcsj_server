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
}

module.exports = new RoleController();