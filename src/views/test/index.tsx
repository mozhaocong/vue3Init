import { defineComponent, ref } from 'vue'
import { Button, DatePicker } from 'ant-design-vue'
import { axiosGet, axiosPost } from '@ht/html-tool'
import dayjs from 'dayjs'
export default defineComponent({
	name: 'test',
	setup() {
		console.log(dayjs('151', 'YY-MM-DD'))
		console.log(dayjs('2011-11-12', 'YY-MM-DD').isValid())
		const data = ref()
		async function testClick() {
			console.trace('testClick')
			// console.log('data', data.value)
			// console.log('dayjs', dayjs(data.value).format('YY-MM-DD'))
			// const res = await axiosGet('http://127.0.0.1:7001/user/findAll')
			const token = localStorage.getItem('token') || ''
			const res = await axiosGet(
				'http://127.0.0.1:7001/user/findParams',
				{
					// const res = await axiosPost('http://127.0.0.1:7001/user/create', {
					id: 1,
					size: '10',
					title: '12616',
					page: 1,
					name: '张三',
					age: '1256xbzb',
					// data: dayjs(data.value).format('YY-MM-DD'),
					// updated_at: '2011-12-11',
				},
				{ headers: { token } },
			)
			console.log('res', res)
		}

		async function testClick1() {
			console.log('asbana')
			const res = await axiosPost('http://127.0.0.1:7001/admin/login', {})
			console.log(res)
			const { token } = res.data
			localStorage.setItem('token', token)
		}

		return () => (
			<>
				<DatePicker v-model={[data.value, 'value']} />
				<Button type="primary" onClick={testClick}>
					111
				</Button>
				<Button type="primary" onClick={testClick1}>
					登录接口
				</Button>
			</>
		)
	},
})
