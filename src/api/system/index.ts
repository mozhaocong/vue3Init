import http from '@/http/index'
const { get, post } = http

export function agreementDetail(body: ObjectMap, options?: ObjectMap): Promise<any> {
	return get('/v3/system/admin/agreement/detail', body, options)
}
