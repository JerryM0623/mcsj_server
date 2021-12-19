// 数据库操作
const DB_User = require('../utils/db_use')
// 工具函数
const utils = require('../utils/index')

// 获取轮播图
const getSwiper = async (ctx) => {
    let selectSwiperSQL = `select * from img_swiper`;
    try {
        let result = await DB_User.packet(selectSwiperSQL);
        result = utils.fillingImgUrl(result);
        ctx.body = {
            "code": 200,
            "msg": "ok",
            "data": JSON.stringify(result)
        };
    } catch (err) {
        ctx.body = {
            "code": 500,
            "msg": "error",
            "data": JSON.stringify(err)
        };
    }
}

const getFeatureGoods = async (ctx) => {
    let selectFeatureGoodsSQL = `( SELECT * FROM good_door UNION SELECT * FROM good_house UNION SELECT * FROM good_window ) ORDER BY good_level DESC;`
    try {
        let result = await DB_User.packet(selectFeatureGoodsSQL);
        result = utils.fillingImgUrl(result);
        ctx.body = {
            "code": 200,
            "msg": "ok",
            "data": JSON.stringify(result)
        };
    } catch (err) {
        ctx.body = {
            "code": 500,
            "msg": "error",
            "data": JSON.stringify(err)
        };
    }
}

module.exports = {
    getSwiper,
    getFeatureGoods
}