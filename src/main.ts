import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import { axiosInit } from '@/utils'
axiosInit({
	setConfigHeaders: (data) => {
		const token = localStorage.getItem('token') || ''
		return { token }
	},
})
const app = createApp(App)
app.use(store)
app.use(Antd)
app.use(router).mount('#app')
