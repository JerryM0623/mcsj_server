const mcsjPool = require('../../../db/mcsjPool');

class OrderService{
    async createOrder(obj){
        try {
            const { userId, locationName, locationPhone, location, productId, buyNumber, buyPrice } = obj;
            const sql = `insert into mcsj_order(user_id, location_name, location_phone, location, product_id, buy_number, buy_price, status) 
            value (${ userId }, '${ locationName }', '${ locationPhone }', '${ location }', ${ productId }, ${ buyNumber }, ${ buyPrice }, 1 );`;
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
                         where  mo.user_id = ${ userId }
                           and  mo.product_id = mgp.id;`;

            const res = await mcsjPool.execute(sql);
            return res[0];
        }catch (e) {
            console.log(e);
            return [];
        }
    }

    async getOrderDetailInfo(orderId){
        try {
            const sql = `select mgp.img_url   as productImgUrl,
                                mgp.name      as productName,
                                mo.buy_number as buyNumber,
                                mo.buy_price  as buyPrice,
                                mo.location_name as locationName,
                                mo.location_phone as locationPhone,
                                mo.location as location,
                                mo.status     as status
                         from   mcsj_order as mo,
                                mcsj_goods_product as mgp
                         where  mo.id = ${ orderId }
                           and  mo.product_id = mgp.id;`;

            const res = await mcsjPool.execute(sql);
            return res[0];
        }catch (e) {
            console.log(e);
            return [];
        }
    }

    async changeOrderStatusToReceive(orderId){
        try {
            const sql = `update mcsj_order set status = 4 where id = ${ orderId };`;
            await mcsjPool.execute(sql);
            return true;
        }catch (e) {
            console.log(e);
            return false;
        }
    }

    async changeOrderStatusToRequestRefund(orderId){
        try {
            const sql = `update mcsj_order set status = 5 where id = ${ orderId };`;
            await mcsjPool.execute(sql);
            return true;
        }catch (e) {
            console.log(e);
            return false;
        }
    }

    async deleteOrder(orderId){
        try {
            const sql = `delete from mcsj_order where id = ${ orderId };`;
            await mcsjPool.execute(sql);
            return true;
        }catch (e) {
            console.log(e);
            return false;
        }
    }

    async getRefundOrderList(userId){
        try {
            const sql = `select mo.id         as orderId,
                                mgp.name      as productName,
                                mgp.img_url   as productImgUrl,
                                mo.buy_number as buyNumber,
                                mo.buy_price  as buyPrice,
                                status
                         from   mcsj_order as mo,
                                mcsj_goods_product as mgp
                         where  mo.user_id = ${ userId }
                           and  mo.product_id = mgp.id
                           and  mo.status > 4;`;

            const res = await mcsjPool.execute(sql);
            return res[0];
        }catch (e) {
            console.log(e);
            return [];
        }
    }
}

module.exports = new OrderService();