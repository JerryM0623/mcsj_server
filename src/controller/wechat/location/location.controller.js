const locationsSevice = require('../../../service/wechat/location/location.service');

class LocationController{

    // 根据 userId 获取数据
    async getLocationsById(ctx){
        const { id } = ctx.query;
        if (id === '' || id === undefined || id === null){
            ctx.body = {
                code: 10010,
                msg: 'bad request',
                data:'id: '+id
            }
            return;
        }
        const locations = await locationsSevice.getLocationsById(id);
        ctx.body = {
            code: 10011,
            msg: '查询成功',
            data: locations
        }

    }

    // 添加新的地址数据
    async addNewLocation(ctx){
        const {userId, name, phone, location} = ctx.request.body;
        const reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;

        /**
         * 通过条件：
         * 1. userId 可查
         * 2. name 非空
         * 3. phone 可通过正则和长度测试
         * 4. location 非空
         */
        if(userId === '-1' || userId === undefined || userId === null || name.trim().length <= 0 || location.trim().length <= 0 || !new RegExp(reg).test(phone.trim()) || phone.trim().length !== 11){
            ctx.body = {
                code: 10012,
                msg: 'nad request',
                data:''
            }
            return;
        }

        const res = await locationsSevice.addNewLocation(userId, name, phone, location);
        if (!res){
            ctx.body = {
                code: 10013,
                msg: '添加失败，请稍后再试',
                data:''
            }
        }else{
            ctx.body = {
                code: 10014,
                msg: '添加成功',
                data:''
            }
        }
    }

    // 根据 locationId 获取准确的某一条地址信息
    async getLocationByLocationId(ctx){
        const { itemId } = ctx.query;
        if(itemId === '-1' || itemId === undefined || itemId === null){
            ctx.body = {
                code: 10015,
                msg: 'bad request',
                data: ''
            }
            return;
        }

        const res = await locationsSevice.getLocationsByLocationId(itemId);
        if(res === null){
            ctx.body = {
                code: 10016,
                msg: '获取数据失败，请重试',
                data: ''
            }
        }else{
            ctx.body = {
                code: 10017,
                msg: '获取成功',
                data: res
            }
        }
    }

    // 根据 locationId 修改某一条地址的信息
    async editLocationByLocationId(ctx){
        const { itemId, name, phone, location } = ctx.request.body;
        const reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
        if(itemId === '-1' || itemId === undefined || itemId === null || name.trim().length <= 0 || location.trim().length <= 0 || !new RegExp(reg).test(phone.trim()) || phone.trim().length !== 11){
            ctx.body = {
                code: 10018,
                msg: 'bad request',
                data: ''
            }
            return;
        }
        const res = await locationsSevice.editLocationByLocationId(itemId, name, phone, location);
        if (!res){
            ctx.body = {
                code: 10019,
                msg: '修改失败请重试',
                data: ''
            }
        }else{
            ctx.body = {
                code: 10020,
                msg: '修改成功',
                data: ''
            }
        }
    }

    // 根绝 locationId 删除某一条地址
    async deleteLocationByLocationId(ctx){
        const { itemId } = ctx.request.body;
        if(itemId === '-1' || itemId === undefined || itemId === null){
            ctx.body = {
                code: 10021,
                msg: 'bad request',
                data: ''
            }
            return;
        }
        const res = await locationsSevice.deleteLocationByLocationId(itemId);
        if (!res){
            ctx.body = {
                code: 10022,
                msg: '删除失败，请重试',
                data: ''
            }
        }else{
            ctx.body = {
                code: 10023,
                msg: '删除成功',
                data: ''
            }
        }
    }
}

module.exports = new LocationController();