import { defineComponent } from 'vue'
import router from '@/router'

export default defineComponent({
	name: 'Header',
	setup() {
		function menuChange(item: any) {
			if (item.key === '1') {
				router.push('/test')
			} else {
				router.push('/login')
			}
		}
		return () => (
			<a-layout-header class="header">
				<div class="logo" />
				<a-menu theme="dark" mode="horizontal" onClick={menuChange}>
					<a-menu-item key="1">nav 1</a-menu-item>
					<a-menu-item key="2">nav 2</a-menu-item>
					<a-menu-item key="3">nav 3</a-menu-item>
				</a-menu>
			</a-layout-header>
		)
	},
})
