
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
}

module.exports = new CarouselService();