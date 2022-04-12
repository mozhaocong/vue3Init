import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
	name: 'Header',
	setup() {
		const route = useRoute()
		console.log(route.fullPath)
		return () => (
			<a-layout style="padding: 0 24px 24px">
				<a-breadcrumb style="margin: 16px 0">
					<a-breadcrumb-item>Home</a-breadcrumb-item>
					<a-breadcrumb-item>List</a-breadcrumb-item>
					<a-breadcrumb-item>App</a-breadcrumb-item>
				</a-breadcrumb>
				<a-layout-content>
					<router-view>
						<keep-alive>{{ Component: <component is="Component" key={route.fullPath} /> }}</keep-alive>
					</router-view>
				</a-layout-content>
			</a-layout>
		)
	},
})
