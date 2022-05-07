const mcsjPool = require('../../../db/mcsjPool');

class LoginService{

    /**
     * 登录接口
     * @param username
     * @param hashPassword
     * @returns {Promise<string|*>}
     */
    async login(username, hashPassword){
        try {
            const sql = `select * from mcsj_user where username = '${ username }';`;
            const res = await mcsjPool.execute(sql);

            console.log(res);

            if(res[0].length === 0){
                return '账户不存在';
            }

            if (res[0][0].password !== hashPassword){
                return '密码错误';
            }

            return res[0][0];
        }catch (e){
            console.log(e);
            return '服务器繁忙';
        }

    }
}

module.exports = new LoginService();