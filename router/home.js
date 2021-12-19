const Router = require('koa-router');
const home = new Router();

const controller = require('../controller/index')

// 获取swiper数据
home.get('/home/getSwiper',controller.home.getSwiper);

// 获取精选商品
home.get('/home/getFeatureGoods',controller.home.getFeatureGoods);

module.exports = home;