const mcsjPool = require('../../../db/mcsjPool');

class RegisterService{

    /**
     * 注册账户
     * @param uuid
     * @param username
     * @param hashPassword
     * @returns {Promise<{msg: (string), status: string}|{status: string}>}
     */
    async register(uuid, username, hashPassword){
        try {
            const sql = `insert into mcsj_user(uuid, username, password) VALUE ('${ uuid }', '${ username }', '${ hashPassword }');`;
            console.log(sql);
            await mcsjPool.execute(sql);
            return {
                status: 'ok',
            };
        }catch (e) {
            console.log(e);

            return {
                status: 'error',
                msg: e.errno === 1062 ? '账户已存在' : '注册失败'
            };
        }
    }
}

module.exports = new RegisterService();