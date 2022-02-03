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
}

module.exports = new PermissionController();