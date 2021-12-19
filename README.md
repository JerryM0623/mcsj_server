# 门窗视界微信小程序接口文档

## Home 页面的服务端接口

### Home 获取轮播图接口

- api：/home/getswiper
- 传参：无
- 返回信息：
    - code: 200\500
    - msg: "ok"\"error"
    - data: json格式的data \ json格式的error信息
    
----
### Home 获取推荐商品

- api: /home/getfeaturegoods
- 传参：
    - currentPageIndex：当前请求的页数
    - pageSize: 每一页的限制数量
- 返回信息：
    - code: 200\500
    - msg: "ok"\"error"
    - data: json格式的数据 \ json格式的error信息