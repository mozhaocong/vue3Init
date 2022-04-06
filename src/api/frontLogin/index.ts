import http from '@/http/index'
const { get, post } = http

export function oauthReset(body: ObjectMap, options?: ObjectMap): Promise<any> {
	return post('/v3/frontLogin/front/oauth/reset', body, options)
}
