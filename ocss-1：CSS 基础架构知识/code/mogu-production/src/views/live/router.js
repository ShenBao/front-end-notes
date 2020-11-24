const liveRouter = [{
	path: '/live/home',
	name: 'LiveHome',
	component: () => import('./home/home.vue')
},{
	path: '/live/detail',
	name: 'LiveDetail',
	component: () => import('./detail/detail.vue')
}]

export default liveRouter