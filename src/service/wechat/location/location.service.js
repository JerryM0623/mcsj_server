const mcsjPool = require('../../../db/mcsjPool');

class LocationService{
    /**
     * 根据 id 获取地址数据
     * @param id
     * @returns {Promise<*[]|*>}
     */
    async getLocationsById(id){
        try {
            const sql = `select id, name, phone, location from mcsj_locations where user_id = ${id};`;
            const res = await mcsjPool.execute(sql);
            return res[0];
        }catch (e) {
            console.log(e);
            return [];
        }
    }

    /**
     * 添加一条全新的地址信息
     * @param id
     * @param name
     * @param phone
     * @param location
     * @returns {Promise<boolean>}
     */
    async addNewLocation(id, name, phone, location){
        try {
            const sql = `insert into mcsj_locations(user_id, name, phone, location) value (${ id } ,'${ name }', '${ phone }', '${ location }');`;
            await mcsjPool.execute(sql);
            return true;
        }catch (e) {
            console.log(e);
            return false;
        }
    }

    /**
     * 根据 locationId 查询 单一一条地址信息
     * @param id
     * @returns {Promise<null|*>}
     */
    async getLocationsByLocationId(id){
        try {
            const sql = `select * from mcsj_locations where id = ${ id };`;
            const res = await mcsjPool.execute(sql);
            return res[0];
        }catch (e) {
            console.log(e);
            return null;
        }
    }

    /**
     * 根据locationId修改地址信息
     * @param id
     * @param name
     * @param phone
     * @param location
     * @returns {Promise<boolean>}
     */
    async editLocationByLocationId(id, name, phone, location){
        try {
            const sql = `update mcsj_locations set name = '${ name }', phone = '${ phone }', location = '${ location }' where id = ${ id };`;
            await mcsjPool.execute(sql);
            return true;
        }catch (e) {
            console.log(e);
            return false;
        }
    }

    async deleteLocationByLocationId(id){
        try {
            const sql = `delete from mcsj_locations where id = ${ id };`;
            await mcsjPool.execute(sql);
            return true;
        }catch (e) {
            console.log(e);
            return false;
        }
    }
}

module.exports = new LocationService();