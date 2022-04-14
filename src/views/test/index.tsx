import { defineComponent } from 'vue'
import { Button } from 'ant-design-vue'
import { erpLogin } from '@/store/modules/erp/login'

export default defineComponent({
	name: 'test',
	setup() {
		const data = {
			a: 2,
			dL: 3,
		}
		return () => <Button type="primary">111</Button>
	},
})
