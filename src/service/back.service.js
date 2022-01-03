const userModel = require('../model/user.model')
const userInfoModel = require('../model/user.info.model')
class BackService{
    /**
     * 确认当前正在登录的账号是否在数据库中存在
     * 若存在，确认密码是否相符合
     * @param account
     * @param password
     * @returns {Promise<number>} 1：无账号信息 2：账号正确密码不正确 3：账号密码正确
     */
    async checkAccount(account, password){
        try{
            // 查询数据
            const res = await userModel.findOne({
                attributes:['id', 'account', 'password'],
                where:{
                    account
                }
            })
            if(!res) return 1;
            return (password === res.password) ? 3 : 2;
        }catch (err){
            console.log('数据库操作出现错误', err);
        }
    }

    /**
     * 根据传递的 account 获取当前登录用户的所有信息
     * @param account
     * @returns {Promise<void>}
     */
    async getUserInfo(account){
        try{
            // 验证账号,得到id
            const user = await userModel.findOne({
                attributes:['id'],
                where:{
                    account
                }
            })
            // 查询数据
            const res = await userInfoModel.findOne({
                attributes:['id', 'user_id', 'user_avatar'],
                where:{
                    user_id:user.dataValues.id
                }
            })
            // 返回
            return res.dataValues;
        }catch (err){
            console.log('数据库操作出现错误',err);
        }
    }
}

module.exports = new BackService();