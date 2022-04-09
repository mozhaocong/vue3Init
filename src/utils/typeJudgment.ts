import { is, isEmpty, isNil } from 'ramda'

function isString(value: any): value is string {
	return is(String, value)
}

function isTrue(value: any): boolean {
	return !(isEmpty(value) || isNil(value))
}

export { isString, isTrue }
