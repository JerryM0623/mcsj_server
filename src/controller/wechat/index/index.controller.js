const indexService = require('../../../service/wechat/index/index.service');

class IndexController{

    // 轮播图列表
    async getSwiperList(ctx){
        const res = await indexService.getSwiperList();
        ctx.body = {
            code: 10001,
            msg: '获取成功',
            data: res
        }
    }

    // 精选列表（分页）
    async getRecommendList(ctx){
        const { pageSize, pageNum } = ctx.query;
        if (pageSize === undefined || pageNum === undefined || pageNum <= 0 || pageSize <= 0){
            ctx.statusCode = 400;
            ctx.body = {
                code: 10002,
                msg: 'no pageSize or pageNum',
                data: ''
            }
            return;
        }

        const res = await indexService.getRecommendList(pageSize, pageNum);
        ctx.body = {
            code: 10003,
            msg: '获取成功',
            data: res
        }
    }
}

module.exports = new IndexController();