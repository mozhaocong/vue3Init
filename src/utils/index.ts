import { configCurryFilter, configFilter } from './modules/business/filter/index'

import { message } from 'ant-design-vue'

// 复制文字
export function copyText(text: string) {
	const textareaEl = document.createElement('textarea')
	textareaEl.setAttribute('readonly', 'readonly') // 防止手机上弹出软键盘
	textareaEl.value = text
	document.body.appendChild(textareaEl)
	textareaEl.select()
	const res = document.execCommand('copy')
	document.body.removeChild(textareaEl)
	message.success('复制成功')
	return res
}

export {
	arrayObjectJudgeNullObject,
	axiosInit,
	axiosPost,
	axiosGet,
	isArray,
	dayJsDataToString,
	dataNumberToString,
	serialNumber,
	setArrayData,
	setArrayFilter,
	setObjetToObject,
	isBlob,
	isFunctionOfOther,
	isNumber,
	isFunction,
	isObject,
	isString,
	isTrue,
	deepClone,
	debounce,
	getArrayFilterData,
	methodType,
	forArrayData,
	EventBus,
	throttle,
	arrayKeyToMap,
	arrayKeyToObject,
	arrayObjectIncludes,
	objectToArray,
	arrayGetData,
	objectFilterEmpty,
	isBoolean,
	getSearchString,
} from '@ht/html-tool'

export { configCurryFilter, configFilter }
