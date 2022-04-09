import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import store from '@/store'
import { clone } from 'ramda'

@Module({ store, name: 'layout', namespaced: true, dynamic: true })
class Layout extends VuexModule {
	public collapsed = false
	public userInfo = {}

	@Action
	public async setUserInfo(data: ObjectMap) {
		this.GET_USERINFO(data)
	}
	@Mutation
	private GET_USERINFO(userInfo: ObjectMap) {
		this.userInfo = clone(userInfo)
	}
}
export const layoutModule = getModule(Layout)
