const Router = require('koa-router');

const carouselController = require('../../../controller/back/carousel.controller')

const adminCarouselRouter = new Router({
    prefix:'/carousel'
})

// 查询已存在于数据库中的数据
adminCarouselRouter.get('/all', carouselController.getAllCarousels);
// 添加轮播图数据
// 上架下架轮播图数据
// 修改轮播图其余数据
// 删除轮播图数据

module.exports = adminCarouselRouter;