const permissionService = require('../../../service/back/permission/permission.service');

class PermissionController {
    /**
     * 分页获取权限信息
     * @param ctx
     * @returns {Promise<void>}
     */
    async getByPageNum(ctx) {
        const {pageSize, pageNum} = ctx.request.query;
        if (!pageSize || !pageNum) {
            ctx.body = {
                code: 400,
                msg: "参数错误",
                data: ""
            }
            return;
        }
        const res = await permissionService.getByPageNum(pageSize, pageNum);
        if (res === {}) {
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
            data: res
        }
    }

    /**
     * 添加权限信息
     * @param ctx
     * @returns {Promise<void>}
     */
    async addPermission(ctx) {
        const {permissionName, permissionComment} = ctx.request.body;
        if (!permissionName || !permissionComment) {
            ctx.body = {
                code: 400,
                msg: '参数错误',
                data: ""
            }
            return;
        }
        const res = await permissionService.addPermission(permissionName, permissionComment);
        if (!res) {
            ctx.body = {
                code: 500,
                msg: '添加失败',
                data: ""
            }
        } else {
            ctx.body = {
                code: 200,
                msg: '添加成功',
                data: ""
            }
        }
    }

    /**
     * 编辑一条权限的信息
     * @param ctx
     * @returns {Promise<void>}
     */
    async editPermission(ctx) {
        const {permissionID, permissionName, permissionComment} = ctx.request.body;
        if (!permissionID || !permissionName || !permissionComment) {
            ctx.body = {
                code: 400,
                msg: '参数错误',
                data: ""
            }
            return;
        }
        const res = await permissionService.editPermission(permissionID, permissionName, permissionComment);
        if (!res) {
            ctx.body = {
                code: 500,
                msg: '编辑失败',
                data: ""
            }
        } else {
            ctx.body = {
                code: 200,
                msg: '编辑成功',
                data: ""
            }
        }
    }

    /**
     * 删除一条权限信息
     * @param ctx
     * @returns {Promise<void>}
     */
    async deletePermission(ctx) {
        const {permissionID} = ctx.request.body;
        if (!permissionID) {
            ctx.body = {
                code: 400,
                msg: '参数错误',
                data: ''
            }
            return;
        }
        const res = await permissionService.deletePermission(permissionID);
        if (!res) {
            ctx.body = {
                code: 500,
                msg: '请先清除该权限关联的所有职位权限关系信息',
                data: ''
            }
        } else {
            ctx.body = {
                code: 200,
                msg: '删除成功',
                data: ''
            }
        }
    }

    /**
     * 查询全部的权限信息
     * @param ctx
     * @returns {Promise<void>}
     */
    async getAllPermission(ctx){
        const res = await permissionService.getAllPermission();
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

module.exports = new PermissionController();