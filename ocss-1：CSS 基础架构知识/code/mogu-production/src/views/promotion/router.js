const promotionRouter = [{
	path: '/promotion/fast-buy',
	name: 'PromotionFastBuy',
	component: () => import('./fast-buy/fast-buy')
},{
	path: '/promotion/last-crazy',
	name: 'PromotionLastCrazy',
	component: () => import('./fast-buy/last-crazy')
},{
	path: '/promotion/my-reminder',
	name: 'PromotionMyReminder',
	component: () => import('./fast-buy/my-reminder')
},{
	path: '/promotion/ydftx',
	name: 'PromotionYdftx',
	component: () => import('./activities/ydftx')
},{
	path: '/promotion/jjyz',
	name: 'PromotionJjyz',
	component: () => import('./activities/jjyz')
},{
	path: '/promotion/qdpsfx',
	name: 'PromotionQdpsfx',
	component: () => import('./activities/qdpsfx')
}]

export default promotionRouter