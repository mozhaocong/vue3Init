import { is, isEmpty, isNil } from 'ramda'

export function isString(value: any): value is string {
	return is(String, value)
}

export function isArray(value: any): value is [] {
	return is(Array, value)
}
export function isObject(value: any): value is ObjectMap {
	return is(Object, value)
}

export function isTrue(value: any): boolean {
	return !(isEmpty(value) || isNil(value))
}
