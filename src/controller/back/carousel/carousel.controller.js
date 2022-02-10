const fs = require('fs');
const path = require('path');
const {v4 : uuidV4} = require('uuid');

const carouselService = require('../../../service/back/carousel/carousel.service');

const adminCarouselUtils = require('../../../utils/admin.carousel.utils');

class CarouselController{
    /**
     * 分页获取数据
     * @param ctx
     * @returns {Promise<void>}
     */
    async getByPageNum(ctx){
        const { pageNum, pageSize } = ctx.request.query;
        if (!pageNum || !pageSize){
            ctx.body = {
                code: 400,
                msg: '参数错误',
                data: ''
            }
            return;
        }
        const res = await carouselService.getByPageNum(pageNum, pageSize);
        if (!res.total){
            ctx.body = {
                code: 500,
                msg: '查询失败',
                data: ''
            }
        }else {
            ctx.body = {
                code: 200,
                msg: '查询成功',
                data: res
            }
        }
    }

    /**
     * 设置轮播图的上下线状态
     * @param ctx
     * @returns {Promise<void>}
     */
    async setCarouselOnlineStatus(ctx){
        const { id, status } = ctx.request.body;
        if (id <= 0 || status < 0){
            ctx.body = {
                code: 400,
                msg: '参数错误',
                data: ''
            }
            return;
        }
        const res = await carouselService.setCarouselOnlineStatus(id, status);
        if (!res){
            ctx.body = {
                code: 500,
                msg: '修改状态失败',
                data: ''
            }
        }else {
            ctx.body = {
                code: 200,
                msg: '修改状态成功',
                data: res
            }
        }
    }












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
                    code:300,
                    msg:'当前数据库无数据',
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

    /**
     * 添加轮播图
     * @param ctx
     * @returns {Promise<void>}
     */
    async addCarousel(ctx){
        const file = ctx.request.files.file;
        const { img_alt, is_online } = ctx.request.body;

        if(file && img_alt && is_online) {
            // 获取文件后缀名
            const dotIndex = file.name.lastIndexOf('.');
            const extension = file.name.substr(dotIndex);

            // 创建文件的 uuid
            const img_uuid = uuidV4();

            // 创建 读文件的 流
            const readStream = fs.createReadStream(file.path);
            // 创建 写文件的 流
            const writeStream = fs.createWriteStream(path.join(__dirname, `../../../static/carousel/${img_uuid}${extension}`));
            // 磁盘写入文件
            await readStream.pipe(writeStream);

            // 创建文件的网络地址访问路径
            const img_url = `/carousel/${img_uuid}${extension}`;
            // 进行数据库操作
            const res = await carouselService.addCarousel(img_uuid, img_url, img_alt, is_online);

            if (res) {
                // 返回前端信息
                ctx.body = {
                    code: 200,
                    msg: '上传图片成功',
                    data: ""
                }
            } else {
                ctx.body = {
                    code: 500,
                    msg: '上传图片失败',
                    data: ""
                }
            }
        }
    }

    /**
     * 更新轮播图信息：简介和是否上线
     * @param ctx
     * @returns {Promise<void>}
     */
    async updateCarousel(ctx) {
        const {img_uuid, img_alt, is_online} = ctx.request.body;
        // 交给service进行处理
        const res = await carouselService.updateCarousel(img_uuid, img_alt, is_online);
        if (res){
            ctx.body = {
                code:200,
                msg:'修改成功',
                data:""
            }
        }else {
            ctx.body = {
                code:500,
                msg:'修改失败',
                data:""
            }
        }
    }

    /**
     * 删除轮播图的接口
     * @param ctx
     * @returns {Promise<void>}
     */
    async deleteCarousel(ctx){
        try {
            const { img_uuid } = ctx.request.body;

            // 操作数据库
            const res = await carouselService.deleteCarousel(img_uuid);
            // const res = true;
            if (res){
                // 删除成功 对磁盘进行操作
                const fileNameList = await fs.promises.readdir(path.join(__dirname, '../../static/carousel'));
                let fileName1 = '';
                fileNameList.forEach((fileName) => {
                    if (fileName.indexOf(img_uuid) > -1){
                       fileName1 = fileName;
                    }
                })
                await fs.promises.unlink(path.join(__dirname, '../../static/carousel/'+fileName1));
                ctx.body = {
                    code:200,
                    msg:'删除成功',
                    data:""
                }

            }else {
                ctx.body = {
                    code:500,
                    msg:'删除失败',
                    data:""
                }
            }
        }catch (e) {
            console.log(e)
            ctx.body = {
                code:500,
                msg:'删除失败',
                data:""
            }
        }
    }
}

module.exports = new CarouselController();