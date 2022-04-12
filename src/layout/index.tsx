import { defineComponent } from 'vue'
import Header from './modules/header'
import Sidebar from './modules/sidebar'
// import Content from './modules/content'
import Content from './modules/content/index.vue'

export default defineComponent({
	name: 'layout',
	setup() {
		return () => (
			<a-layout style="height: 100vh">
				<Header />
				<a-layout>
					<Sidebar />
					<Content />
				</a-layout>
			</a-layout>
		)
	},
})
