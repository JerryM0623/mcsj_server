
const mcsjPool = require('../../db/mcsjPool')

class CarouselService{
    /**
     * 获取 数据库中存在的所有轮播图数据
     * @returns {Promise<*[]|*>}
     */
    async getAllCarousels(){
        try {
            const selectSql = 'select * from mcsj_carousel;';
            const res = await mcsjPool.execute(selectSql);
            return res[0];
        }catch (e) {
            console.log(e);
            return [];
        }
    }

    async addCarousel(img_uuid, img_url, img_alt, is_online){
        try {
            // 设计sql
            const sql = `insert into mcsj_carousel(img_uuid, img_url, img_alt, is_online) VALUE ('${ img_uuid }', '${img_url}', '${ img_alt }', ${ is_online === '上线' ? 1 : 0 });`;
            // 运行
            await mcsjPool.execute(sql);

            return true;
        }catch (e) {
            console.log(e);
            return false;
        }
    }

    /**
     * 根据 uuid 更新信息，操作数据库
     * @param img_uuid
     * @param img_alt
     * @param is_online
     * @returns {Promise<boolean>}
     */
    async updateCarousel(img_uuid, img_alt, is_online){
        try {
            // 设计 sql
            const sql = `update mcsj_carousel set img_alt = '${ img_alt }', is_online = ${ is_online } where img_uuid = '${ img_uuid }';`;
            // 操作数据库
            await mcsjPool.execute(sql);
            return true;
        }catch (e) {
            console.log(e)
            return false;
        }
    }

    /**
     * 删除轮播图的数据库操作
     * @param img_uuid
     * @returns {Promise<boolean>}
     */
    async deleteCarousel(img_uuid){
        try{
            // 创建sql
            const sql = `delete from mcsj_carousel where img_uuid = '${ img_uuid }';`;
            // 运行
            await mcsjPool.execute(sql);

            return true;
        }catch (e) {
            console.log(e);
            return false;
        }
    }
}

module.exports = new CarouselService();