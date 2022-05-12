/* admin 管理后台的 login 接口的 service 层 */

const adminPool = require('../../../db/adminPool')

class LoginService{
    async login(account){
        const sql = `select au.id       as id,
                            au.account  as account,
                            au.password as password,
                            ar.id       as roleId,
                            ar.name     as roleName
                       from admin_users as au,
                            admin_user_role as aur,
                            admin_roles as ar
                      where au.account = '${ account }'
                        and au.id = aur.user_id
                        and aur.role_id = ar.id;`;
        const res = await adminPool.execute(sql);
        return res[0][0];
    }
}

module.exports = new LoginService();