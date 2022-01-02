const Koa = require('koa');

const { APP_PORT } = require('./config/config.default');
const router = require('./router/index');

const app = new Koa();

app.use(router.routes()).use(router.allowedMethods());

app.listen(APP_PORT,() => {
    console.log(`server is running on http://localhost:${APP_PORT}`);
})