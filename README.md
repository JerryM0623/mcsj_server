# 门窗视界微信小程序及其后台管理系统接口文档

## 微信小程序端的接口文档

### Home 页面的服务端接口

#### Home 获取轮播图接口

- method: GET
- path: /home/login
- 传参:无
- 返回信息：
    - code:
        - 200 -> 成功
        - 500 -> error
    - msg:
        - ok
        - error
    - data:
      ```json
      [
          {"id": 1,"account": "10000","role": "超级管理员"},
          {"id": 2,"account": "10001","role": "商品管理员"},
          {"id": 3,"account": "10002","role": "商品管理员"},
          {"id": 4,"account": "10003","role": "客服专员"}
      ]
      ```

----

#### Home 获取推荐商品

- method: GET
- path: /home/getfeaturegoods
- 传参:无
- 返回信息：
    - code:
        - 200 -> 成功
        - 500 -> error
    - msg:
        - ok
        - error
    - data:
      ```json
      [
          {"id": 1,"account": "10000","role": "超级管理员"},
          {"id": 2,"account": "10001","role": "商品管理员"},
          {"id": 3,"account": "10002","role": "商品管理员"},
          {"id": 4,"account": "10003","role": "客服专员"}
      ]
      ```

----

## 管理后台的服务端接口

### login页面的接口

#### 账号登录

- method: POST
- path: /b/login
- 传参:
    - account --> 账号
    - password --> 密码
- 返回信息：
    - code:
        - 200 -> 成功
        - 400 -> 密码错误
        - 404 -> 账号不存在
        - 500 -> error
    - msg:
        - ok
        - 密码错误，请重新输入
        - 当前登录账号不存在，请确认信息
        - error
    - data:
      ```json
      [
          {"id": 1,"account": "10000","role": "超级管理员"},
          {"id": 2,"account": "10001","role": "商品管理员"},
          {"id": 3,"account": "10002","role": "商品管理员"},
          {"id": 4,"account": "10003","role": "客服专员"}
      ]
      ```
----      
