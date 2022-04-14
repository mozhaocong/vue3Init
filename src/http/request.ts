import { isTrue } from '@/utils'

export function setConfigHeaders(): ObjectMap {
	const data = localStorage.getItem('token')
	return isTrue(data) ? { Authorization: data } : {}
}
