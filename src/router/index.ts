import { _RouteRecordBase, createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const history = createWebHistory()

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'index',
		component: () => import('@/layout/index'),
		children: [
			{
				path: '/test',
				name: 'test',
				meta: { keepAlive: true },
				component: () => import('@/views/test'),
			},
			{
				path: '/test2',
				name: 'test2',
				meta: { keepAlive: true },
				component: () => import('@/views/test/index2'),
			},
		],
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/login/index'),
	},
]
const router = createRouter({
	history,
	routes,
})
export default router
