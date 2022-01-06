
const carouselService = require('../../service/back/carousel.service');

const adminCarouselUtils = require('../../utils/admin.carousel.utils');

class CarouselController{
    /**
     * 获取数据库中的所有轮播图数据
     * @param ctx
     * @returns {Promise<void>}
     */
    async getAllCarousels(ctx){
        try{
            // 进入service层进行数据库处理
            let res = await carouselService.getAllCarousels();
            if (res.length > 0){
                // 填充链接
                res = adminCarouselUtils.fillImgUrl(res);
                // 修改 is_online
                res = adminCarouselUtils.transformIsOnline(res);
                ctx.body = {
                    code:200,
                    msg:'获取轮播图信息成功',
                    data:res
                }
            }else {
                ctx.body = {
                    code:500,
                    msg:'获取轮播图信息失败',
                    data:""
                }
            }
        }catch (e) {
            ctx.body = {
                code:500,
                msg:'暂时无法获取数据，请稍后重试',
                data:""
            }
        }
    }
}

module.exports = new CarouselController();