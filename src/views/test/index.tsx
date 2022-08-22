import { defineComponent, ref } from 'vue'
import { Button, DatePicker } from 'ant-design-vue'
import { axiosGet, axiosPost } from '@ht/html-tool'
import dayjs from 'dayjs'
export default defineComponent({
	name: 'test',
	setup() {
		const token = localStorage.getItem('token') || ''
		console.log(dayjs('151', 'YY-MM-DD'))
		console.log(dayjs('2011-11-12', 'YY-MM-DD').isValid())
		async function testClick() {
			console.trace('testClick')
			const res = await axiosGet(
				'http://127.0.0.1:7001/user/findParams',
				{
					id: 1,
					size: '10',
					title: '12616',
					page: 1,
				},
				{ headers: { token } },
			)
			console.log('res', res)
		}

		async function testClick1() {
			const res = await axiosPost('http://127.0.0.1:7001/admin/login', {})
			console.log(res)
			const { token } = res.data
			localStorage.setItem('token', token)
		}

		async function createUser() {
			const data = {
				name: 'test1',
				age: 10,
			}
			const res = await axiosPost('http://127.0.0.1:7001/user/create', data)
			console.log(res)
		}

		async function groupCreate() {
			const data = {
				groupName: 'test1',
			}
			const res = await axiosPost('http://127.0.0.1:7001/group/create', data, { headers: { token } })
			console.log(res)
		}
		async function groupCheck() {
			const res = await axiosGet(
				'http://127.0.0.1:7001/group/findParams',
				{
					size: '10',
					page: 1,
				},
				{ headers: { token } },
			)
			console.log('res', res)
		}

		return () => (
			<div style="display: flex;justify-content: space-around;">
				<Button type="primary" onClick={testClick1}>
					登录接口
				</Button>
				<Button type="primary" onClick={testClick}>
					用户查询接口
				</Button>
				<Button type="primary" onClick={createUser}>
					创建用户
				</Button>
				<Button onClick={groupCreate}>创建群组</Button>
				<Button onClick={groupCheck}>查看群组</Button>
			</div>
		)
	},
})
