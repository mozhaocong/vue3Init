import { defineComponent } from 'vue'
import { Button } from 'ant-design-vue'
import { axiosGet, axiosPost } from '@ht/html-tool'
export default defineComponent({
	name: 'test',
	setup() {
		async function loginClick() {
			const res = await axiosPost('http://127.0.0.1:7001/admin/login', {})
			const { token } = res.data
			localStorage.setItem('token', token)
		}
		async function checkUser() {
			const res = await axiosGet('http://127.0.0.1:7001/user/findParams', {
				id: 1,
				size: '10',
				title: '12616',
				page: 1,
			})
			console.log('res', res)
		}

		async function createUser() {
			const data = {
				name: 'testUser',
				age: 10,
				email: '123456@163.com',
				password: '123456',
			}

			const res = await axiosPost('http://127.0.0.1:7001/user/create', data)
			console.log(res)
		}

		async function createGroup() {
			const data = {
				groupName: 'testGroup',
			}
			const res = await axiosPost('http://127.0.0.1:7001/group/create', data)
			console.log(res)
		}
		async function createRole() {
			const data = {
				roleName: '测试角色2',
			}
			const res = await axiosPost('http://127.0.0.1:7001/role/create', data)
			console.log(res)
		}
		async function updateRole() {
			const data = {
				id: 1,
				roleName: '测试角色3',
			}
			const res = await axiosPost('http://127.0.0.1:7001/role/update', data)
			console.log(res)
		}
		async function groupCheck() {
			const res = await axiosGet('http://127.0.0.1:7001/group/findParams', {
				size: '10',
				page: 1,
			})
			console.log('res', res)
		}
		async function checkRole() {
			const res = await axiosGet('http://127.0.0.1:7001/role/findParams')
			console.log('res', res)
		}

		async function createUserRole() {
			const data = {
				// name: Date.now() + '用户角色',
				name: '1111用户角色',
				age: 10,
				email: Date.now() + '@163.com',
				password: '123456',
				roleList: [
					// {
					// 	id: 4,
					// 	roleName: '用户角色添加1',
					// },
					{
						// roleName: Date.now() + '用户角色',
						roleName: '12512612用户角色',
					},
				],
			}

			const res = await axiosPost('http://127.0.0.1:7001/user/create', data)
		}
		async function updateUserRole() {
			const data = {
				id: 1,
				name: '8291033',
				age: 10,
				email: 'ahah@163.com',
				password: '123456',
				roleList: [
					{
						id: 4,
						roleName: '12616',
					},
					// { id: 100 },
					{ id: 1 },
					// {
					// 	roleName: '12616',
					// },
				],
			}

			const res = await axiosPost('http://127.0.0.1:7001/user/update', data)
		}

		// async function destroyUser() {
		// 	const res = await axiosPost(
		// 		'http://127.0.0.1:7001/user/destroy',
		// 		{
		// 			id: 3,
		// 		},
		// 		{ headers: { token } },
		// 	)
		// 	console.log('res', res)
		// }

		return () => (
			<div style="display: flex;justify-content: space-around;">
				<Button type="primary" onClick={loginClick}>
					登录接口
				</Button>
				<Button type="primary" onClick={checkUser}>
					用户查询接口
				</Button>
				<Button type="primary" onClick={createUser}>
					创建用户
				</Button>
				{/*<Button type="primary" onClick={destroyUser}>*/}
				{/*	删除用户*/}
				{/*</Button>*/}
				<Button type="primary" onClick={createGroup}>
					创建群组
				</Button>
				<Button type="primary" onClick={groupCheck}>
					查看群组
				</Button>
				<Button type="primary" onClick={createRole}>
					添加角色
				</Button>
				<Button type="primary" onClick={checkRole}>
					查看角色
				</Button>
				<Button type="primary" onClick={updateRole}>
					更新角色
				</Button>
				<Button type="primary" onClick={createUserRole}>
					创建用户和角色
				</Button>
				<Button type="primary" onClick={updateUserRole}>
					更新用户和角色
				</Button>
			</div>
		)
	},
})
