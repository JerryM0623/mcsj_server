const permissionService = require('../../../service/back/permission/permission.service');

class PermissionController{
    /**
     * 获取全部权限信息的controller层函数
     * @param ctx
     * @returns {Promise<void>}
     */
    async getAll(ctx){
        // 使用 service层 连接数据库
        const res = await permissionService.getAll();
        // 判断
        if (res.length > 0){
            // 得到了数据进行排序
            const newArr = res.sort((prevItem,nextItem) => {
                return prevItem.id - nextItem.id;
            })
            // 返回数据
            ctx.body = {
                code:200,
                msg:'查询成功',
                data:newArr
            }
        }else {
            ctx.body = {
                code:500,
                msg:'查询失败',
                data:""
            }
        }
    }

    /**
     * 添加一条新的权限信息的controller函数
     * @param ctx
     * @returns {Promise<void>}
     */
    async addPermission(ctx){
        // 获取信息
        const { permission_name } = ctx.request.body;
        // 请求数据
        if (!permission_name){
            ctx.body = {
                code:500,
                msg:"参数错误,请检查",
                data:""
            }
            return;
        }
        const res = await permissionService.addPermission(permission_name);
        if (!res){
            ctx.body = {
                code:500,
                msg:"添加失败,请稍后重试",
                data:""
            }
            return;
        }
        ctx.body = {
            code:200,
            msg:"添加成功",
            data:""
        }
    }
}

module.exports = new PermissionController();