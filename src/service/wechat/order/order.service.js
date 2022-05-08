const mcsjPool = require('../../../db/mcsjPool');

class OrderService{
    async createOrder(obj){
        try {
            const { userId, locationId, productId, buyNumber, buyPrice } = obj;
            const sql = `insert into mcsj_order(user_id, location_id, product_id, buy_number, buy_price, status) 
            value (${ userId }, ${ locationId }, ${ productId }, ${ buyNumber }, ${ buyPrice }, 1 );`;
            const res = await mcsjPool.execute(sql);
            return res[0].insertId;
        }catch (e) {
            console.log(e);
            return false;
        }
    }

    async changeOrderStatusToPaid(orderId){
        try {
            const sql = `update mcsj_order set status = 2 where id = ${ orderId };`;
            await mcsjPool.execute(sql);
            return true;
        }catch (e) {
            console.log(e);
            return false;
        }
    }

    async getOrderList(userId){
        try {
            const sql = `select mo.id         as orderId,
                                mgp.name      as productName,
                                mgp.img_url   as productImgUrl,
                                mo.buy_number as buyNumber,
                                mo.buy_price  as buyPrice,
                                status
                         from   mcsj_order as mo,
                                mcsj_goods_product as mgp
                         where  mo.user_id = 1
                           and  mo.product_id = mgp.id;`;

            const res = await mcsjPool.execute(sql);
            return res[0];
        }catch (e) {
            console.log(e);
            return [];
        }
    }
}

module.exports = new OrderService();