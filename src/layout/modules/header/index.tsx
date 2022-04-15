import { defineComponent, ref } from 'vue'
import router from '@/router'

export default defineComponent({
	name: 'Header',
	setup() {
		function menuChange(item: any) {
			console.log(item)
		}
		const list = ref<ObjectMap[]>([
			{ title: '采购', name: 'purchase' },
			{ title: '订单', name: 'oms' },
		])
		return () => (
			<a-layout-header class="header">
				<div class="logo" />
				<a-menu theme="dark" mode="horizontal" onClick={menuChange}>
					{list.value.map((item) => {
						return <a-menu-item key={item.name}>{item.title}</a-menu-item>
					})}
				</a-menu>
			</a-layout-header>
		)
	},
})
