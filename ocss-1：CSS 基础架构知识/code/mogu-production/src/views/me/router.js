const meRouter = [{
	path: '/me/login',
	name: 'MeLogin',
	component: () => import('./login/login.vue')
},{
	path: '/me/me',
	name: 'MeMe',
	component: () => import('./me/me.vue')
}]

export default meRouter