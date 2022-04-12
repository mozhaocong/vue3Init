import { defineComponent } from 'vue'
import { Button } from 'ant-design-vue'
export default defineComponent({
	name: 'test',
	setup() {
		const data = {
			a: 2,
			dL: 3,
		}
		return () => <Button type="primary">789</Button>
	},
})
