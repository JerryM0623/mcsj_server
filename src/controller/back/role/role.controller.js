const roleService = require('../../../service/back/role/role.service')

class RoleController {
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
}

module.exports = new RoleController();