const mcsjPool = require('../../../db/mcsjPool');

class GoodsSeriesService {
    /**
     * 获取全部商品类型(门系列,窗系列,...)
     * @returns {Promise<*[]|*>}
     */
    async getAllGoodsTypes() {
        try {
            const sql = 'select type_name from mcsj_goods_type;'
            const res = await mcsjPool.execute(sql);
            return res[0];
        } catch (e) {
            console.log(e);
            return [];
        }
    }

    /**
     * 获取所有的商品系列
     * @returns {Promise<*[]|*>}
     */
    async getAllSeries() {
        try {
            const sql = 'select gs.id, gt.type_name,gs.series_name from mcsj.mcsj_goods_type as gt,mcsj.mcsj_goods_series as gs where gs.goods_type = gt.id;';
            const res = await mcsjPool.execute(sql);
            return res[0];
        } catch (e) {
            console.log(e);
            return [];
        }

    }

    /**
     * 编辑一个系列的信息
     * @param id -> 根据 id 进行更新
     * @param series_name -> 新的系列名字
     * @param type_name -> 新的商品类型名字
     * @returns {Promise<boolean>}
     */
    async editSeries(id, series_name, type_name) {
        try {
            // 获取到新系列所对应的id
            const sql = `select id from mcsj_goods_type where type_name = '${type_name}';`;
            const res = await mcsjPool.execute(sql);
            const type_id = res[0][0].id;
            // 更新数据
            const sql2 = `update mcsj_goods_series set goods_type = ${type_id}, series_name = '${series_name}' where id = ${id};`;
            await mcsjPool.execute(sql2);
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    /**
     * 添加一个新的系列
     * @param type_name
     * @param series_name
     * @returns {Promise<boolean>}
     */
    async addSeries(type_name, series_name) {
       try {
           // 获取id
           const sql = `select id from mcsj_goods_type where type_name = '${type_name}';`;
           const res = await mcsjPool.execute(sql);
           const type_id = res[0][0].id
           // 添加数据
           const sql2 = `insert into mcsj_goods_series(goods_type, series_name) value (${type_id},'${series_name}');`;
           mcsjPool.execute(sql2);
           return true;
       }catch (e) {
        console.log(e);
        return false;
       }
    }

    /**
     * 删除一个系列信息
     * @param id
     * @returns {Promise<boolean>}
     */
    async deleteSeries(id){
        try {
            const sql = `delete from mcsj_goods_series where id = ${ id };`;
            await mcsjPool.execute(sql);
            return true;
        }catch (e) {
            console.log(e);
            return false;
        }
    }
}

module.exports = new GoodsSeriesService();