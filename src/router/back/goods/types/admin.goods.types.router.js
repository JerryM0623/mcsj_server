const Router = require('koa-router');
const GoodsTypesController = require('../../../../controller/back/goods/types/goods.types.controller');

const adminGoodsTypesRouter = new Router({
    prefix:'/goods/types'
})

// 根据分页信息获取数据
adminGoodsTypesRouter.get('/getByPage', GoodsTypesController.getByPage);
// 添加数据
adminGoodsTypesRouter.post('/addType', GoodsTypesController.addType);
// 编辑数据
adminGoodsTypesRouter.post('/editType', GoodsTypesController.editType);
// 删除数据
adminGoodsTypesRouter.post('/deleteType', GoodsTypesController.deleteType);

module.exports = adminGoodsTypesRouter;