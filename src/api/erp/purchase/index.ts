import { get } from '@/http'
const api = 'http://erp_test.admin.htwig.com'
export function purchase_orders(data: ObjectMap, options?: ObjectMap) {
	return get(api + '/api/purchase_orders', data, options)
}
// http://erp_test.admin.htwig.com/api/purchase_orders
