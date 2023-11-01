1. eslint-config-airbnb-base 对eslint的版本要求
```
  "eslint": "^4.19.1 || ^5.3.0",
  "eslint-plugin-import": "^2.18.0"
```
2. 若想eslint生效, 加上typescript
```
    "eslint.validate": [
        "javascript",
        "typescript"
    ]
```

3. 测试地址
* 房间列表：
```js
   http://localhost:3000/service/live/v2/vod/?zip=0&page=1&num=10&subject=&kind=
   http://localhost:3000/service/live/v2/room/?uid=687662654&client=2
```
* 首页视频全集
```js
  http://live.local.jj.cn:3000/service/apiLive/service/roomlist/?zip=0&client=2
```
* 贡献榜
```js
 http://localhost:3000/service/rank?dwRLBID_IN=90152&bIsMatchRLB_IN=0&dwGroupIndex_IN=1218&dwCycleNum_IN=0&dwRLBType_IN=0&dwUserID_IN=687662654&PageIndex=1&PageSize=20

https://msgdx.srv.jj.cn/rlbext/GetGrlOneGroup.aspx?dwRLBID_IN=90152&bIsMatchRLB_IN=0&dwGroupIndex_IN=1218&dwCycleNum_IN=0&dwRLBType_IN=0&dwUserID_IN=687662654&PageIndex=1&PageSize=20

```
* 投票
```js
http://localhost:3000/api/vote/voteInfo?userId=687662654&liveId=13845
```

* 用户Grow
  
```js
http://localhost:3000/api/user/userGrow?userId=687662654&growId=999
```

* 用户Money
```js
http://localhost:3000/api/user/userMoney?userId=687662654
```

1. TS中不要使用as，不然会挂，原因进一步排查