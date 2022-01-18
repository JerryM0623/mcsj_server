const permissionService = require('../../../service/back/permission/permission.service');

class PermissionController{
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
}

module.exports = new PermissionController();