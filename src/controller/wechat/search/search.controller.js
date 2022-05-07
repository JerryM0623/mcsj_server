const searchService = require('../../../service/wechat/search/search.service');

class SearchController{
    async search(ctx){
        const { keyWord } = ctx.query;
        if (keyWord === undefined || keyWord === null || keyWord.trim().length <= 0){
            ctx.body = {
                code: 10024,
                msg: '关键字输入有误，请重新输入',
                data: ''
            }
            return;
        }

        const res = await searchService.search(keyWord);
        if (res === false){
            ctx.body = {
                code: 10025,
                msg: '搜索失败，请重试',
                data: ''
            }
        }else{
            ctx.body = {
                code: 10026,
                msg: '搜索成功',
                data: res
            }
        }
    }
}
module.exports = new SearchController();