const mallRouter = [{
	path: '/mall/home',
	name: 'MallHome',
	component: () => import('./home/home.vue')
},{
	path: '/mall/store',
	name: 'MallStore',
	component: () => import('./store/store.vue')
},{
	path: '/mall/category',
	name: 'MallCategory',
	component: () => import('./category/category.vue')
},{
	path: '/mall/goods',
	name: 'MallGoods',
	component: () => import('./goods/goods.vue')
},{
	path: '/mall/goods-detail',
	name: 'MallGoodsDetail',
	component: () => import('./goods/detail.vue')
},{
	path: '/mall/brand-video',
	name: 'MallBrandVideo',
	component: () => import('./brand-video/brand-video.vue')
}]

export default mallRouter