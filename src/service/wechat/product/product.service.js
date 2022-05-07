const mcsjPool = require('../../../db/mcsjPool');

class ProductService{
    async getInfomation(uuid){
        try {
            const sql = `select * from mcsj_goods_product where uuid = '${ uuid }';`;
            const res = await mcsjPool.execute(sql);
            return res[0];
        }catch (e) {
            console.log(e);
            return [];
        }
    }
}

module.exports = new ProductService();