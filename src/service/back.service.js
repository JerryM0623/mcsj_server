class BackService{
    // 登录接口进行用户验证
    async checkUser(username,password) {
        console.log(username, password);
        return true;
    }
}

module.exports = new BackService();