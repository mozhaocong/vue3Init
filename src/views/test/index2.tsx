import { defineComponent, ref } from 'vue'
import { Button } from 'ant-design-vue'
export default defineComponent({
	name: 'test2',
	setup() {
		const test = ref(1)
		setTimeout(() => {
			test.value = 10
		}, 1000)
		return () => (
			<div>
				<div>{test.value}</div>
				<Button type="primary">789</Button>
			</div>
		)
	},
})
