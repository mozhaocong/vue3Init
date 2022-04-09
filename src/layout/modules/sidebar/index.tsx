import { defineComponent } from 'vue'
import { isTrue } from '@/utils'

export default defineComponent({
	name: 'Sidebar',
	setup() {
		const SidebarList = [
			{ title: 'A', name: 'A', path: '/a' },
			{
				title: 'B',
				path: '/b',
				name: 'B',
				children: [
					{ title: 'B-1', name: 'B1', path: '/b/1' },
					{ title: 'B-2', name: 'B2', path: '/b/2', children: [{ title: 'B-2-1', name: 'B21', path: '/b/2/1' }] },
				],
			},
		]
		function setSidebarItem(data: any) {
			return data.map((item: any) => {
				if (isTrue(item.children)) {
					return (
						<a-sub-menu key={item.name} title={item.title}>
							{setSidebarItem(item.children)}
						</a-sub-menu>
					)
				} else {
					return <a-menu-item key={item.name}>{item.title}</a-menu-item>
				}
			})
		}

		return () => (
			<a-layout-sider>
				<a-menu mode="inline" style={{ height: '100%', borderRight: 0 }}>
					{setSidebarItem(SidebarList)}
				</a-menu>
			</a-layout-sider>
		)
	},
})
