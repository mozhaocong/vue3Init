import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import store from '@/store'
import { clone } from 'ramda'

@Module({ store, name: 'layout', namespaced: true, dynamic: true })
class Layout extends VuexModule {
	public collapsed = false
	public layout = 22

	@Action
	public async setUserInfo1(data: ObjectMap) {
		this.GET_LAYOUT(11)
	}
	@Mutation
	public GET_LAYOUT(userInfo: any) {
		this.layout = clone(userInfo)
	}
}
export const layoutModule = getModule(Layout)
