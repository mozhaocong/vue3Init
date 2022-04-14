import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import table from './modules/table'
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
		],
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/login/index'),
	},
	{
		path: '/:pathMatch(.*)',
		//访问主页的时候 重定向到index页面
		redirect: '/404',
	},
	{
		path: '/404',
		name: '/404',
		component: import('@/views/404'),
	},
	{ ...table },
]
const router = createRouter({
	history,
	routes,
})
export default router
