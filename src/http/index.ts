import axios from 'axios'
import { setConfigHeaders } from '@/http/request'
// import qs from 'qs'

export function axiosInit() {
	//post请求头
	axios.defaults.baseURL = '' //正式
	if (!axios.defaults.headers) {
		axios.defaults.headers = {}
	}
	// axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'

	//允许跨域携带cookie信息
	// axios.defaults.withCredentials = true
	//设置超时
	axios.defaults.timeout = 10000

	axios.interceptors.request.use(
		(config) => {
			config.headers = { ...setConfigHeaders(), ...config.headers }
			return config
		},
		(error) => {
			return Promise.reject(error)
		},
	)

	axios.interceptors.response.use(
		(response) => {
			if (response.status == 200) {
				return Promise.resolve(response)
			} else {
				return Promise.reject(response)
			}
		},
		(error) => {
			console.log(error)
			// alert(JSON.stringify(error), '请求异常', {
			// 	confirmButtonText: '确定',
			// 	callback: (action) => {
			// 		console.log(action)
			// 	},
			// })
		},
	)
}

/**
 * @param {String} url
 * @param {Object} data
 * @returns Promise
 */
export function post(url: string, data: any, options = {}) {
	return new Promise((resolve, reject) => {
		axios({
			method: 'post',
			url,
			data: data,
			...options,
		})
			.then((res: any) => {
				if (res.status !== 200) {
					console.log('接口报错')
				}
				resolve(res.data)
			})
			.catch((err) => {
				reject(err)
			})
	})
}

export function get(url: string, data: any, options = {}): Promise<any> {
	return new Promise((resolve, reject) => {
		axios({
			method: 'get',
			url,
			params: data,
			...options,
		})
			.then((res) => {
				resolve(res.data)
			})
			.catch((err) => {
				reject(err)
			})
	})
}
