import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import store from '@/store'
import { authorizations } from '@/api/erp/login'

@Module({ store, name: 'erpLogin', namespaced: true, dynamic: true })
class Login extends VuexModule {
	public token = localStorage.getItem('token') || ''

	@Action
	public async onLogin(data?: ObjectMap) {
		const res: any = await authorizations(data || {})
		if (!res.code) {
			this.SET_TOKEN(res.data.token_type + ' ' + res.data.access_token)
		}
	}
	@Mutation
	public SET_TOKEN(token: string) {
		localStorage.setItem('token', token)
		this.token = token
	}
}
export const erpLogin = getModule(Login)
