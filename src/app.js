const Koa = require('koa');
const app = new Koa();

// 配置跨域
const cors = require('koa2-cors');
app.use(cors({
    // 允许全部 host 访问
    origin: (ctx) => {
        return ctx.header.origin;
    },
    // 允许携带 cookie
    credentials: true,
    // 允许的方法
    allowMethods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

// 配置 body 解析
const KoaBody = require('koa-body');
app.use(KoaBody({
    multipart:true, // 允许传递文件
}));

// 配置 static 静态资源文件夹
const KoaStatic = require('koa-static');
const path = require('path');
app.use(KoaStatic(path.join(__dirname,'./static')));

// 启用路由
const backRouter = require('./router/back.router');
const weChatRouter = require('./router/wechat.router');
app.use(backRouter.routes()).use(backRouter.allowedMethods()); // admin 管理端的路由
app.use(weChatRouter.routes()).use(weChatRouter.allowedMethods()); // wechat 小程序端的路由

// 监听端口
const { PORT } = require('./config/app.config')
app.listen(PORT,() => {
    console.log(`服务已启动，请访问http://localhost:${PORT}`);
})