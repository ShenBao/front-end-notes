import Vue from 'vue'
import VueRouter from 'vue-router'
import LifeCycle from '../views/LifeCycle.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'LifeCycle',
    component: LifeCycle
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/keep',
    name: 'keepAlive',
    component: () => import(/* webpackChunkName: "about" */ '../views/keepAlive.vue'),
  },
  {
    path: '/show',
    name: 'ifAndShow',
    component: () => import(/* webpackChunkName: "about" */ '../views/IfAndShow.vue'),
  },
  {
    path: '/vuex',
    name: 'vuex',
    component: () => import(/* webpackChunkName: "about" */ '../views/Vuex.vue'),
  }
]

const router = new VueRouter({
  routes
})

export default router
