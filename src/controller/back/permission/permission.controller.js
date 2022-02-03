const permissionService = require('../../../service/back/permission/permission.service');

class PermissionController{
    /**
     * 分页获取权限信息
     * @param ctx
     * @returns {Promise<void>}
     */
    async getByPageNum(ctx){
        const { pageSize, pageNum } = ctx.request.query;
        if (!pageSize || !pageNum){
            ctx.body = {
                code: 400,
                msg: "参数错误",
                data:""
            }
            return;
        }
        const res = await permissionService.getByPageNum(pageSize, pageNum);
        if (!res.total){
            ctx.body = {
                code: 500,
                msg: "查询失败",
                data: ""
            }
            return;
        }
        ctx.body = {
            code: 200,
            msg: "查询成功",
            data:res
        }
    }

    /**
     * 添加权限信息
     * @param ctx
     * @returns {Promise<void>}
     */
    async addPermission(ctx){
        const { permissionName, permissionComment } = ctx.request.body;
        if (!permissionName || !permissionComment){
            ctx.body = {
                code: 400,
                msg: '参数错误',
                data:""
            }
            return;
        }
        const res = await permissionService.addPermission(permissionName, permissionComment);
        if (!res){
            ctx.body = {
                code: 500,
                msg: '添加失败',
                data:""
            }
        }else {
            ctx.body = {
                code: 200,
                msg: '添加成功',
                data:""
            }
        }
    }
}

module.exports = new PermissionController();