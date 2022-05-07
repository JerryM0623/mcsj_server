const mcsjPool = require('../../../db/mcsjPool');

class SearchService {

    /**
     * 模糊搜索
     * @param keyWord
     * @returns {Promise<boolean|*>}
     */
    async search(keyWord) {
        try {
            const sql = `select uuid, name, origin_price, sale_price, img_url from mcsj_goods_product where is_online = 1 and name like '%${ keyWord }%';`;
            const res = await mcsjPool.execute(sql);
            return res[0];
        }catch (e) {
            console.log(e);
            return false;
        }
    }
}

module.exports = new SearchService();