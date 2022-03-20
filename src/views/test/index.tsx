import { defineComponent } from 'vue'
import { Button } from 'ant-design-vue'
export default defineComponent({
	name: 'layout',
	setup() {
		const data = {
			a: 2,
			dL: 3,
		}
		console.log(data)
		return () => <Button type="primary">111</Button>
	},
})
