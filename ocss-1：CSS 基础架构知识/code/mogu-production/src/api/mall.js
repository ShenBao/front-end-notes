import request from '@/utils/request'
/**
 * 推荐类目
 */
export const getRecommendatoryCategorys = () => request({
  url: '/mall/recommendatory-categorys',
  method: 'get'
});

/**
 * 轮播图
 */
export const getBanners = () => request({
  url: '/mall/banners',
  method: 'get'
});

/**
 * 获取所有品类视频列表
 */
export const getBrandVideos = () => request({
  url: '/mall/brand-videos',
  method: 'get'
});

/**
 * 获取活动列表
 */
export const getPromotions = () => request({
  url: '/mall/promotions',
  method: 'get'
});

/**
 * 获取某品类视频列表
 */
export const getBrandVideosById = (params) => request({
  url: '/mall/brand-videos/'+params.id,
  method: 'get'
});

/**
 * 获取商品类目
 */
export const getCategorys = () => request({
  url: '/mall/categorys',
  method: 'get'
});

/**
 * 获取某种品类
 */
export const getOneCategory = (params) => request({
  url: '/mall/categorys/'+params.id,
  method: 'get'
});

/**
 * 获取某品类的所有商品
 */
export const getCategoryGoods = (params) => request({
  url: '/mall/goods/'+params.id,
  method: 'get'
});

/**
 * 热门搜索
 */
export const getHotCategorys = () => request({
  url: '/mall/hot-categorys',
  method: 'get'
});

/**
 * 搜索
 */
export const getGoodsId = (params) => request({
  url: '/mall/goods-id/' + params.name,
  method: 'get'
});

/**
 * 商品详情
 */
export const getGoodsDetailById = (params) => request({
  url: '/mall/goods-detail/' + params.id,
  method: 'get'
});