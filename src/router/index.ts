import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const history = createWebHistory()
const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'index',
		component: () => import('@/layout/index.vue'),
	},
]
const router = createRouter({
	history,
	routes,
})
export default router
