import { post } from '@/http'
const api = 'http://erp_test.admin.htwig.com'
export function authorizations(data: ObjectMap, options?: ObjectMap) {
	return post(api + '/api/authorizations', data, options)
}
