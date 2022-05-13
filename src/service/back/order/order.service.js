const mcsjPool = require('../../../db/mcsjPool');

class OrderService{
    async getOrderByPage(pageNum, pageSize){
        try {
            const sql1 = `select COUNT(*) as total from mcsj.mcsj_order;`;
            const res1 = await mcsjPool.execute(sql1);
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
                total: res1[0][0].total,
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

    async getOrderLocation(orderId){
        try {
            const sql = `select location_name as locationName, location_phone as locationPhone, location 
                         from mcsj.mcsj_order where id = ${ orderId };`;
            const res = await mcsjPool.execute(sql);
            console.log(res[0][0]);
            return res[0][0];
        }catch (e) {
            console.log(e);
            return {};
        }
    }
}

module.exports = new OrderService();