const mcsjPool = require('../../../db/mcsjPool');

class CategoryService{
    async getSeries(){
        try {
            const sql = `select id, name from mcsj_goods_series;`;
            const res = await mcsjPool.execute(sql);
            return res[0];
        }catch (e) {
            console.log(e);
            return [];
        }
    }

    async getTypes(){
        try {
            const sql = `select id, series_id as seriesId, name from mcsj_goods_types;`
            const res = await mcsjPool.execute(sql);
            return res[0];
        }catch (e) {
            console.log(e);
            return [];
        }
    }

    async getSeriesTypeProductInfo(seriesId, typeId){
        try {
            const sql = `select uuid, name, origin_price as originPrice, sale_price as salePrice, img_url as imgUrl from mcsj_goods_product where series_id = ${ seriesId } and type_id = ${ typeId } and is_online = 1;`;
            const res = await mcsjPool.execute(sql);
            return res[0];
        }catch (e) {
            console.log(e);
            return [];
        }
    }
}

module.exports = new CategoryService();