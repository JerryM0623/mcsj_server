const Router = require('koa-router');
const router = new Router();

const home = require('./home');

// 启动 home
router.use(home.routes(),home.allowedMethods());

module.exports = router;