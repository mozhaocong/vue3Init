import { defineComponent, computed } from 'vue'
import { Modal } from 'ant-design-vue'
import { useRoute } from 'vue-router'

export default defineComponent({
	name: 'Header',
	setup() {
		return () => (
			<a-layout-header class="header">
				<div class="logo" />
				<a-menu theme="dark" mode="horizontal">
					<a-menu-item key="1">nav 1</a-menu-item>
					<a-menu-item key="2">nav 2</a-menu-item>
					<a-menu-item key="3">nav 3</a-menu-item>
				</a-menu>
			</a-layout-header>
		)
	},
})
