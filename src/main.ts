import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import { axiosInit } from '@/http'
axiosInit()
const app = createApp(App)
app.use(store)
app.use(Antd)
app.use(router).mount('#app')
