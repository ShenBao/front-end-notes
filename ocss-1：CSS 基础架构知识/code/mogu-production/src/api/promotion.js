import request from '@/utils/request'

/**
 * 今日必抢
 */
export const getHotGoods = () => request({
  url: '/promotion/hot-goods',
  method: 'get'
});

/**
 * 限时快抢
 */
export const getFastBuyGoods = (params) => request({
  url: '/promotion/fastbuy-goods/'+params.time,
  method: 'get'
});

/**
 * 即将售罄与我的快抢
 */
export const getPromotionGoods = (params) => request({
  url: '/promotion/goods/'+params.status,
  method: 'get'
});

/**
 * 拒绝臃肿
 */
export const getJjyzGoods = () => request({
  url: '/promotion/jjyz-goods',
  method: 'get'
});

/**
 * 运动风童鞋专场
 */
export const getYdftxGoods = () => request({
  url: '/promotion/ydftx-goods',
  method: 'get'
});

/**
 * 秋冬配饰分享
 */
export const getQdpsfxGoods = () => request({
  url: '/promotion/qdpsfx-goods',
  method: 'get'
});