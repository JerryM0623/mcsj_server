const Router = require('koa-router');

const carouselController = require('../../../controller/back/carousel.controller')

const adminCarouselRouter = new Router({
    prefix:'/carousel'
})

// 查询已存在于数据库中的数据
adminCarouselRouter.get('/all', carouselController.getAllCarousels);
// 上传轮播图文件及其附带信息的接口
adminCarouselRouter.post('/add', carouselController.addCarousel);
// 修改轮播图其余数据
adminCarouselRouter.post('/update', carouselController.updateCarousel);
// 删除轮播图数据
adminCarouselRouter.post('/delete', carouselController.deleteCarousel)

module.exports = adminCarouselRouter;