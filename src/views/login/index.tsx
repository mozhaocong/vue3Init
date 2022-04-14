import { defineComponent, reactive, ref } from 'vue'
import { HTFrom, PassWordInput } from '@/components'
import { Button } from 'ant-design-vue'
import { erpLogin } from '@/store/modules/erp/login'

export default defineComponent({
	name: 'login',
	setup() {
		const data = ref<ObjectMap>({})
		const rows: FromRowArray = [
			{
				title: '',
				key: 'name',
				rules: [{ required: true, message: '不能为空', trigger: 'change' }],
			},
			{
				title: '',
				key: 'password',
				rules: [{ required: true, message: '不能为空', trigger: 'change' }],
				component: PassWordInput,
			},
		]

		async function toLogin() {
			const { name, password } = data.value
			const res = await erpLogin.onLogin({ name, password })
			console.log(res)
		}

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
						finish={toLogin}
					/>
					<Button type="primary" htmlType="submit" {...{ form: 'login' }}>
						登录
					</Button>
				</div>
			</div>
		)
	},
})
