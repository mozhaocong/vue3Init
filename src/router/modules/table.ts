// 测试
const index = {
	path: '/table',
	redirect: '/table/list',
	name: 'table',
	component: () => import('@/layout/index'),
	meta: {
		title: '表单',
	},
	children: [
		{
			path: '/table/list',
			name: 'tableList',
			component: () => import('@/views/table/list'),
			meta: {
				title: '表单列表',
			},
		},
	],
}
export default index
