const mcsjPool = require('../../../db/mcsjPool');

class OrderService{
    async getOrderByPage(pageNum, pageSize){
        try {
            const sql1 = `select COUNT(*) from mcsj.mcsj_order`;
            const res1 = mcsjPool.execute(sql1);
            const sql = `select mo.id as orderId,
                                mu.username as userName,
                                mo.location_name as locationName,
                                mo.location_phone as locationPhone,
                                mo.location as location,
                                mgp.name as productName,
                                mo.buy_number as buyNumber,
                                mo.buy_price as buyPrice,
                                mo.status as status
                           from mcsj.mcsj_order as mo,
                                mcsj.mcsj_user as mu,
                                mcsj.mcsj_goods_product as mgp
                          where mo.user_id = mu.id
                            and mo.product_id = mgp.id
                          limit ${ pageSize }
                         offset ${ pageSize * (pageNum - 1) };`;
            const res = await mcsjPool.execute(sql);
            return {
                total: res1,
                list: res[0]
            }
        }catch (e){
            console.log(e);
            return {
                total: -1,
                list: null
            };
        }
    }
}

module.exports = new OrderService();