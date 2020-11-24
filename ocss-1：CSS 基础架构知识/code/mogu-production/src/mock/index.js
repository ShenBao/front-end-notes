import Mock from 'mockjs'
import mall from './mall'
import live from './live'
import me from './me'
import promotion from './promotion'

Mock.setup({
  timeout: '300-600'
})

// mall 相关
Mock.mock('/api/mall/categorys', 'get', mall.getCategorys)
Mock.mock(/\/api\/mall\/categorys\/\d*/, 'get', mall.getOneCategory)
Mock.mock('/api/mall/banners', 'get', mall.getBanners)
Mock.mock('/api/mall/brand-videos', 'get', mall.getBrandVideos)
Mock.mock(/\/api\/mall\/brand-videos\/\d*/, 'get', mall.getBrandVideosById)
Mock.mock('/api/mall/recommendatory-categorys', 'get', mall.getRecommendatoryCategorys)
Mock.mock('/api/mall/promotions', 'get', mall.getPromotions)
Mock.mock('/api/mall/hot-categorys', 'get', mall.getHotCategorys)
Mock.mock(/\/api\/mall\/goods\/\d*/, 'get', mall.getCategoryGoods)
Mock.mock(/\/api\/mall\/goods-id\/\d*/, 'get', mall.getGoodsId)
Mock.mock(/\/api\/mall\/goods-detail\/\d*/, 'get', mall.getGoodsDetailById)

// live 相关
Mock.mock('/api/live/lives', 'get', live.getLives)
Mock.mock(/\/api\/live\/lives\/\d*/, 'get', live.getLivesById)

// me 相关
Mock.mock('/api/me/login', 'post', me.login)
Mock.mock('/api/me/me', 'get', me.getMe)
Mock.mock('/api/me/chats', 'get', me.getChats)

// promotion 相关
Mock.mock('/api/promotion/hot-goods', 'get', promotion.getHotGoods)
Mock.mock(/\/api\/promotion\/fastbuy-goods\/.*/, 'get', promotion.getFastBuyGoods)
Mock.mock(/\/api\/promotion\/goods\/\w*/, 'get', promotion.getPromotionGoods)
Mock.mock('/api/promotion/jjyz-goods', 'get', promotion.getJjyzGoods)
Mock.mock('/api/promotion/ydftx-goods', 'get', promotion.getYdftxGoods)
Mock.mock('/api/promotion/qdpsfx-goods', 'get', promotion.getQdpsfxGoods)

export default Mock;