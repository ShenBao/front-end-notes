import request from '@/utils/request'
import {store} from '@/store';

/**
 * 登录
 */
export const login = (params) => request({
  url: '/me/login',
  data: params,
  method: 'post'
});

/**
 * 获取我的信息
 */
export const getMe = () => request({
  url: '/me/me',
  method: 'get',
  data: {
    token: store.state.token
  }
});

/**
 * 获取聊天信息
 */
export const getChats = () => request({
  url: '/me/chats',
  method: 'get',
  data: {
    token: store.state.token
  }
});