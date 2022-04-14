import { App } from 'vue'

import HTFrom from './From/index'
import PassWordInput from './PassWordInput/index'
import Common from './Common'

export { HTFrom, PassWordInput, Common }

const components = [HTFrom, PassWordInput, Common.Rsearch]

function install(app: App) {
	components.forEach(function (component) {
		app.use(component)
	})
	return app
}
export default {
	install: install,
}
