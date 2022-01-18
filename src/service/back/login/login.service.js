/* admin 管理后台的 login 接口的 service 层 */

const adminPool = require('../../../db/adminPool')

class LoginService{
    async login(account){
        const sql = `select * from admin_users where account = '${account}';`
        const res = await adminPool.execute(sql);
        return res[0][0];
    }
}

module.exports = new LoginService();