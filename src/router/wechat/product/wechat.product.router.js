const Router = require('koa-router');
const productRouter = new Router({
    prefix:'/product'
})
const productController = require('../../../controller/wechat/product/product.controller');

// 通过uuid 获取全部信息
productRouter.get('/get', productController.getInfomation);



module.exports = productRouter;