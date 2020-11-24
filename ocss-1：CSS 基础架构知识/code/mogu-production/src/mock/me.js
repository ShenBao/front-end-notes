import Mock from 'mockjs'

export default {

  // 登录
  login: config => {
    const {account, password} = JSON.parse(config.body);
    
    if(account == '123' && password == '123') {
      return Mock.mock({
        status: 200,
        msg: '登录成功',
        data: {
          token: '4378488sdsd29399281xjdjfkdf',
          avatar: 'https://s5.mogucdn.com/mlcdn/c45406/200902_7ekllijh17kb8hccca8aa8774hfjl_400x400.jpg_160x160.v1cAC.70.webp',
          account: '小小小'
        }
      })
    } else {
      return Mock.mock({
        status: 10000,
        msg: '账号或密码错误',
        data: {}
      })
    }
    
  },

  // 获取我的信息
  getMe: config => {
    let data = '';
    
    if (JSON.parse(config.body)['token'] == '4378488sdsd29399281xjdjfkdf') {
      data = {
        "data": {
          "token": "4378488sdsd29399281xjdjfkdf",
          "avatar": "https://s5.mogucdn.com/mlcdn/c45406/200902_7ekllijh17kb8hccca8aa8774hfjl_400x400.jpg_160x160.v1cAC.70.webp",
          "account": "小小小"
        },
        "status": 200,
        "msg": "请求成功"
      }
    } else {
      data = {
        "data": "",
        "status": 403,
        "msg": "未登录"
      }
    }
    return data;
  },

  getChats: config => {
    let data = '';
    
    if (JSON.parse(config.body)['token'] == '4378488sdsd29399281xjdjfkdf') {
      data = {
        "data": "暂未开发该功能",
        "status": 200,
        "msg": "请求成功"
      }
    } else {
      data = {
        "data": "",
        "status": 403,
        "msg": "未登录"
      }
    }
    return data;
  }
}