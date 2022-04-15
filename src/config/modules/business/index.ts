import { forEach, keys } from 'ramda'
import { omsOptObject } from '@/config/modules/business/oms'

export const businessOptObject: Config = {
	...omsOptObject,
	yesNoStatus: {
		0: '否',
		1: '是',
	},

	baseStatus: {
		0: '禁用',
		1: '启用',
	},
}

function getOptions(data: Config): { [index: string]: Array<OptionsValue> } {
	const _obj: { [index: string]: Array<OptionsValue> } = {}
	forEach((key) => {
		const list: Array<OptionsValue> = []
		const item = data[key]
		forEach((key) => {
			const a = Number(key)
			list.push({
				value: isNaN(a) ? key : a,
				label: item[key],
			})
		}, keys(item))
		_obj[key] = list
	}, keys(data))
	return _obj
}
export const configBusinessDataOptions = getOptions(businessOptObject)
