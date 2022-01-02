const userModel = require('../model/user.model')
class BackService{
    /**
     * 确认账号
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
}

module.exports = new BackService();