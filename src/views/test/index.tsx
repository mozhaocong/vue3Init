import { defineComponent, ref } from 'vue'
import { Button, DatePicker } from 'ant-design-vue'
import { axiosPost } from '@ht/html-tool'
import dayjs from 'dayjs'
export default defineComponent({
	name: 'test',
	setup() {
		console.log(dayjs('151', 'YY-MM-DD'))
		console.log(dayjs('2011-11-12', 'YY-MM-DD').isValid())
		const data = ref()
		async function testClick() {
			// console.log('data', data.value)
			// console.log('dayjs', dayjs(data.value).format('YY-MM-DD'))
			// const res = await axiosGet('http://127.0.0.1:7001/user/findAll')
			// const res = await axiosGet('http://127.0.0.1:7001/user/findParams', {
			const res = await axiosPost('http://127.0.0.1:7001/user/create', {
				id: 1,
				title: '12616',
				name: false,
				// data: dayjs(data.value).format('YY-MM-DD'),
				date: '2011-12-11',
			})
			console.log('res', res)
		}

		return () => (
			<>
				<DatePicker v-model={[data.value, 'value']} />
				<Button type="primary" onClick={testClick}>
					111
				</Button>
			</>
		)
	},
})
