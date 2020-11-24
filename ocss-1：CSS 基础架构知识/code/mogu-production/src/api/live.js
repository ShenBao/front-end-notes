import request from '@/utils/request'
/**
 * 获取直播列表
 */
export const getLives = () => request({
  url: '/live/lives',
  method: 'get'
});

/**
 * 直播间
 */
export const getLivesById = (params) => request({
  url: '/live/lives/'+params.id,
  method: 'get'
});