import { App } from 'vue'
import PassWordInput from './PassWordInput/index'
import Common from './Common'
import FormConfig from './Business/FormConfig'

const { RSearch, RForm, RTable } = Common
export { PassWordInput, RSearch, RForm, RTable, Common, FormConfig }

const components = [PassWordInput, RSearch, RForm, RTable]

function install(app: App) {
	components.forEach(function (component) {
		app.use(component)
	})
	return app
}
export default {
	install: install,
}
