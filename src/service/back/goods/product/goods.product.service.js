const mcsjPool = require('../../../../db/mcsjPool');

class GoodsProductService {
    /**
     * window的分页获取接口
     * @param ctx
     * @returns {Promise<{total: number, list: []}|{total, list: *}>}
     */
    async windowGetByPageNum(ctx) {
        try {
            const { pageSize, pageNum } = ctx.request.query;

            const CountSQL = `select COUNT(*) as total from mcsj_goods_product where series_id = 1;`;
            const selectSQL = `select p.id as id, p.uuid as uuid, t.name as typeName, p.name as name,
                                      p.comment_1 as commentOne, p.comment_2 as commentTwo, p.comment_3 as commentThree,
                                      p.origin_price as originPrice, p.sale_price as salePrice,
                                      p.img_url as imgUrl, p.is_hot as isHot,
                                      p.is_online as isOnline
                                from mcsj_goods_product as p, mcsj_goods_types as t
                                where p.series_id = 1 and p.type_id = t.id
                                limit ${ pageSize }
                                offset ${ pageSize * ( pageNum - 1 ) };`;

            const CountRes = await mcsjPool.execute(CountSQL);
            const selectRes = await mcsjPool.execute(selectSQL);

            return {
                total: CountRes[0][0].total,
                list: selectRes[0]
            }
        } catch (e) {
            console.log(e);
            return {
                list: [],
                total: -1
            }
        }
    }

    async doorGetByPageNum(ctx){
        try {
            const { pageSize, pageNum } = ctx.request.query;

            const CountSQL = `select COUNT(*) as total from mcsj_goods_product where series_id = 1;`;
            const selectSQL = `select p.id as id, p.uuid as uuid, t.name as typeName, p.name as name,
                                      p.comment_1 as commentOne, p.comment_2 as commentTwo, p.comment_3 as commentThree,
                                      p.origin_price as originPrice, p.sale_price as salePrice,
                                      p.img_url as imgUrl, p.is_hot as isHot,
                                      p.is_online as isOnline
                                from mcsj_goods_product as p, mcsj_goods_types as t
                                where p.series_id = 2 and p.type_id = t.id
                                limit ${ pageSize }
                                offset ${ pageSize * ( pageNum - 1 ) };`;

            const CountRes = await mcsjPool.execute(CountSQL);
            const selectRes = await mcsjPool.execute(selectSQL);

            return {
                total: CountRes[0][0].total,
                list: selectRes[0]
            }
        } catch (e) {
            console.log(e);
            return {
                list: [],
                total: -1
            }
        }
    }

    /**
     * window上下架的接口
     * @param obj
     * @returns {Promise<boolean>}
     */
    async changeWindowStatus(obj){
        const { status, id } = obj;
        try {
            const sql = `update mcsj_goods_product set is_online = ${ status } where id = ${ id };`;
            await mcsjPool.execute(sql);
            return true;
        }catch (e) {
            console.log(e);
            return false;
        }
    }

    /**
     * door 的上下架接口
     * @param obj
     * @returns {Promise<boolean>}
     */
    async changeDoorStatus(obj){
        const { status, id } = obj;
        try {
            const sql = `update mcsj_goods_product set is_online = ${ status } where id = ${ id };`;
            await mcsjPool.execute(sql);
            return true;
        }catch (e) {
            console.log(e);
            return false;
        }
    }

    /**
     * window的删除商品接口
     * @param id
     * @returns {Promise<boolean>}
     */
    async deleteWindow(id){
        try {
            const sql = `delete from mcsj_goods_product where id = ${ id };`;
            await mcsjPool.execute(sql);
            return true;
        }catch (e) {
            console.log(e);
            return false;
        }
    }

    /**
     * 删除一个门商品
     * @param id
     * @returns {Promise<boolean>}
     */
    async deleteDoor(id){
        try {
            const sql = `delete from mcsj_goods_product where id = ${ id };`;
            await mcsjPool.execute(sql);
            return true;
        }catch (e) {
            console.log(e);
            return false;
        }
    }

    /**
     * 新增一个商品
     * @param body
     * @param uuid
     * @param url
     * @returns {Promise<boolean>}
     */
    async addWindow(body, uuid, url){
        try {
            const { typeId, seriesId, name, commentOne, commentTwo, commentThree,
                isHot, isOnline, originPrice, salePrice } = body;
            const sql = `insert into mcsj_goods_product(uuid, series_id, 
                         type_id, name, comment_1, comment_2, comment_3, origin_price, 
                         sale_price, img_url, is_hot, is_online)
                         VALUE ('${ uuid }', ${ seriesId }, ${ typeId }, '${ name }', '${ commentOne }', 
                         '${ commentTwo }', '${ commentThree }', ${ originPrice }, ${ salePrice }, '${ url }', ${ isHot }, ${ isOnline });`;

            await mcsjPool.execute(sql);
            return true;
        }catch (e) {
            console.log(e);
            return false;
        }
    }

    /**
     * 添加一个 door
     * @param body
     * @param uuid
     * @param url
     * @returns {Promise<boolean>}
     */
    async addDoor(body, uuid, url){
        try {
            const { typeId, seriesId, name, commentOne, commentTwo, commentThree,
                isHot, isOnline, originPrice, salePrice } = body;
            const sql = `insert into mcsj_goods_product(uuid, series_id, 
                         type_id, name, comment_1, comment_2, comment_3, origin_price, 
                         sale_price, img_url, is_hot, is_online)
                         VALUE ('${ uuid }', ${ seriesId }, ${ typeId }, '${ name }', '${ commentOne }', 
                         '${ commentTwo }', '${ commentThree }', ${ originPrice }, ${ salePrice }, '${ url }', ${ isHot }, ${ isOnline });`;

            await mcsjPool.execute(sql);
            return true;
        }catch (e) {
            console.log(e);
            return false;
        }
    }

    /**
     * 获取一个 name 对应的 uuid
     * @param id
     * @returns {Promise<string|*>}
     */
    async getPicUrl(id){
        try {
            const sql = `select img_url as url from mcsj_goods_product where id = '${ id }';`;
            const res = await mcsjPool.execute(sql);
            console.log(res[0]);
            return res[0][0].url;
        }catch (e) {
            console.log(e);
            return '';
        }
    }

    /**
     * 更新云端的图片信息
     * @param imgUrl
     * @param uuid
     * @returns {Promise<boolean>}
     */
    async updatePicUrl(imgUrl, uuid){
        try {
            const sql = `update mcsj_goods_product set img_url = '${ imgUrl }' where uuid = '${ uuid }';`;
            await mcsjPool.execute(sql);
            return true;
        }catch (e) {
            console.log(e);
            return false;
        }
    }

    /**
     * 更新窗户的数据
     * @param body
     * @param uuid
     * @returns {Promise<boolean>}
     */
    async updateWindow(body, uuid){
        try {
            /*
            * typeId, name, comment1,
            * comment2, comment3, originPrice,
            * salePrice, ishot, isonline
            */
            const { typeId, name, commentOne, commentTwo,
                commentThree, originPrice, salePrice, isHot, isOnline } = body;

            const sql = `update mcsj_goods_product set type_id = ${ typeId }, name = '${ name }', comment_1 = '${ commentOne }', 
                                   comment_2 = '${ commentTwo }', comment_3 = '${ commentThree }', origin_price = ${ originPrice }, 
                                   sale_price = ${ salePrice }, is_hot = ${ isHot }, is_online = ${ isOnline } 
                                   where uuid = '${ uuid }';`;

            await mcsjPool.execute(sql);
            return true;
        }catch (e) {
            console.log(e);
            return false;
        }
    }

    /**
     * 编辑一个door
     * @param body
     * @param uuid
     * @returns {Promise<boolean>}
     */
    async updateDoor(body, uuid){
        try {
            const { typeId, name, commentOne, commentTwo,
                commentThree, originPrice, salePrice, isHot, isOnline } = body;

            const sql = `update mcsj_goods_product set type_id = ${ typeId }, name = '${ name }', comment_1 = '${ commentOne }', 
                                   comment_2 = '${ commentTwo }', comment_3 = '${ commentThree }', origin_price = ${ originPrice }, 
                                   sale_price = ${ salePrice }, is_hot = ${ isHot }, is_online = ${ isOnline } 
                                   where uuid = '${ uuid }';`;

            await mcsjPool.execute(sql);
            return true;
        }catch (e) {
            console.log(e);
            return false;
        }
    }

}

module.exports = new GoodsProductService();