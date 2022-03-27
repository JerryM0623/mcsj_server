const mcsjPool = require('../../../db/mcsjPool');

class IndexService{
    // 获取轮播图列表
    async getSwiperList(){
        try {
            const sql = 'select id, img_uuid as uuid, img_url as url, img_alt as alt from mcsj_carousel where is_online = 1;';
            const res = await mcsjPool.execute(sql);
            return res[0]
        }catch (e) {
            console.log(e);
            return [];
        }
    }

    // 获取精选列表
    async getRecommendList(pageSize, pageNum){
        try {
            const sql = `select id, uuid, name, sale_price as price, img_url as url from mcsj_goods_product where is_hot = 1 and is_online = 1 limit ${ pageSize } offset ${ (pageNum - 1) * pageSize };`;
            const res = await mcsjPool.execute(sql);
            return res[0];
        }catch (e) {
            console.log(e);
            return [];
        }
    }
}

module.exports = new IndexService();