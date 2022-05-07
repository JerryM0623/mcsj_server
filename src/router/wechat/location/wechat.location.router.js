const Router = require('koa-router');

const locationController = require('../../../controller/wechat/location/location.controller');

const locationRouter = new Router({
    prefix: '/location'
})

// 根据id获取对应的地址数据
locationRouter.get('/get', locationController.getLocationsById);
// 添加新的地址数据
locationRouter.post('/add', locationController.addNewLocation);
// 根据某一个id获取对应的数据
locationRouter.get('/one', locationController.getLocationByLocationId);
// 根据locationId修改地址信息
locationRouter.post('/edit', locationController.editLocationByLocationId);
// 删除一个 location
locationRouter.post('/delete', locationController.deleteLocationByLocationId);

module.exports = locationRouter;