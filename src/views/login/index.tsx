import { defineComponent, reactive, ref } from 'vue'
import { HTFrom } from '@/components'
import { Button } from 'ant-design-vue'

export default defineComponent({
	name: 'login',
	setup() {
		// const data = ref({
		// 	name: '',
		// 	password: '',
		// })
		const data = ref({})
		const rows: FromRowArray = [
			{
				title: '',
				key: 'name',
				rules: [{ required: true, message: 'sku不能为空', trigger: 'change' }],
			},
			{
				title: '',
				key: 'password',
				rules: [{ required: true, message: 'sku不能为空', trigger: 'change' }],
				component: () => {
					return <a-input type="password" />
				},
			},
		]

		return () => (
			<div>
				<div style="width:200px;margin: auto;">
					<HTFrom
						fid="login"
						rows={rows}
						model={data.value}
						colSpan={24}
						labelCol={{ span: 0 }}
						wrapperCol={{ span: 24 }}
						finish={() => {
							console.log('1251')
						}}
					/>
					<Button type="primary" htmlType="submit" {...{ form: 'login' }}>
						登录
					</Button>
				</div>
			</div>
		)
	},
})
