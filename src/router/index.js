/**
 * 所有router的总出口
 */
const Router = require('koa-router');
const router = new Router();

const backRouter = require('./back.router');
router.use(backRouter.routes()).use(backRouter.allowedMethods());

module.exports = router;