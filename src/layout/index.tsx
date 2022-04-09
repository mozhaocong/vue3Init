import { defineComponent } from 'vue'
import Header from './modules/header'
import Sidebar from './modules/sidebar'

export default defineComponent({
	name: 'layout',
	setup() {
		return () => (
			<a-layout>
				<Header />
				<a-layout>
					<Sidebar />
				</a-layout>
			</a-layout>
		)
	},
})
