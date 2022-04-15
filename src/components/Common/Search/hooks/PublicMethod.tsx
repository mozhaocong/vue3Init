import { map, clone, curry, last, head, isNil, forEach } from 'ramda'
import { rangePickerShowTime, valueFormat } from '@/config'
import { isObject, isArray, isString } from '@/utils'
import RRangePicker from '../../RangePicker/index'
import { h, resolveComponent } from 'vue'

// 例子
// const pageSate = ref({
// 	defOrders: {
// 		isSearch: true,
// 		value: defaultParams
// 	},
// 	spPlatform: {
// 		isSearch: true,
// 		slotType: 'selectOption',
// 		slotList: [
// 			{ label: '创建人', key: 'sku', component: markRaw(FormSysUser) },
// 			{ label: '销售负责人', key: 'sellerSku' }
// 		],
// 		selectKey: 'sku',
// 		value: {}
// 	},
// 	spPlatform1: {
// 		isSearch: true,
// 		slotType: 'rangePicker',
// 		slotList: [
// 			{ label: '创建时间1', key: 'createTimeGe1', rangePicker: ['createTimeGe1', 'createTimeLe1'] }
// 			// { label: '交易时间2', key: 'createTimeGe2', rangePicker: ['createTimeGe2', 'createTimeLe2'] },
// 			// { label: '交易时间3', key: 'createTimeGe3', rangePicker: ['createTimeGe2', 'createTimeLe2'] },
// 			// { label: '交易时间4', key: 'createTimeGe4', rangePicker: ['createTimeGe2', 'createTimeLe2'] },
// 			// { label: '交易时间5', key: 'createTimeGe5', rangePicker: ['createTimeGe2', 'createTimeLe2'] },
// 			// { label: '交易时间6', key: 'createTimeGe6', rangePicker: ['createTimeGe2', 'createTimeLe2'] },
// 			// { label: '交易时间7', key: 'createTimeGe7', rangePicker: ['createTimeGe2', 'createTimeLe2'] }
// 		],
// 		selectKey: 'createTimeGe1',
// 		value: []
// 	}
// })

// 函数返回节点时不能解析参数，参数.value也不行，怎样传进来的，就怎样传下去，不能拆分

// key: createTimeGe2,  value: ['2021-10-07 00:00:00', '2021-11-11 23:59:59'] array: [['createTimeGe2', 'createTimeLe2'],['createTimeGe1', 'createTimeLe1']]
export function screeningTime(key: string, value: any, KeyArray: any[]) {
	if (!(value && value.length)) return {}
	const data: ObjectMap = {}
	KeyArray.forEach((i: any[]) => {
		if (i && i.includes(key)) {
			data[i[0]] = value[0]
			data[i[1]] = value[1]
		}
	})
	return data
}

export function rangePickerSlot(item: any, key?: string) {
	const setData = key ? item.value[key] : item
	const options = map((res) => {
		if (!res.value) {
			res.value = res.key
		}
		return res
	}, clone(setData.slotList) || [])
	if (setData.slotList.length === 1) {
		return (
			<a-form-item labelCol={{ span: 5 }} wrapperCol={{ span: 19 }} label={setData.slotList[0].label}>
				<a-range-picker
					style={{ width: '100%' }}
					v-model={[setData.value, 'value']}
					showTime={rangePickerShowTime}
					valueFormat={valueFormat}
				/>
			</a-form-item>
		)
	} else {
		return (
			<a-form-item wrapperCol={{ span: 22 }}>
				<a-input-group compact>
					<a-select style={{ width: '35%' }} v-model={[setData.selectKey, 'value']} options={options} />
					<a-range-picker
						style={{ width: '65%' }}
						v-model={[setData.value, 'value']}
						showTime={rangePickerShowTime}
						valueFormat={valueFormat}
					/>
				</a-input-group>
			</a-form-item>
		)
	}
}

export function selectOptionSlot(item: any, key?: string) {
	const setData = key ? item.value[key] : item
	const options = map((res) => {
		if (!res.value) {
			res.value = res.key
		}
		return res
	}, clone(setData.slotList) || [])
	return (
		<a-form-item wrapperCol={{ span: 22 }}>
			<a-input-group compact>
				<a-select style={{ width: '33%' }} v-model={[setData.selectKey, 'value']} options={options} />
				{map((item) => {
					if (item.key !== setData.selectKey) {
						return ''
					}
					return setComponent(item, setData)
				}, setData.slotList)}
			</a-input-group>
		</a-form-item>
	)
}

function setComponent(row: any, setData: any) {
	return row.render
		? row.render(setData)
		: h(
				row.component
					? isString(row.component)
						? resolveComponent(row.component)
						: row.component
					: resolveComponent('a-input'),
				{
					style: { width: '58%' },
					allowClear: true,
					...row.props,
					[row.modelValue ?? 'value']: setData.value[setData.selectKey],
					[`onUpdate:${row.modelValue ?? 'value'}`]: ($event: ObjectMap) => (setData.value[setData.selectKey] = $event),
				},
		  )
}

export function setRRangePicker({ pickerTimeA, pickerTimeB, label }: any, item: ObjectMap) {
	return (
		<a-form-item labelCol={{ span: 5 }} wrapperCol={{ span: 19 }} label={label}>
			<RRangePicker
				v-models={[
					[item.value[pickerTimeA], 'pickerTimeA'],
					[item.value[pickerTimeB], 'pickerTimeB'],
				]}
			/>
		</a-form-item>
	)
}

function rSearchDataModel(pageSate: ObjectMap, searchForm: ObjectMap) {
	let searchData: ObjectMap = {}
	for (const i in pageSate) {
		const forData: any = pageSate[i]
		if (isObject(forData) && forData.isSearch) {
			switch (forData.slotType) {
				case 'rangePicker':
					if (forData.value) {
						const keyList = map((item) => {
							if (forData.selectKey === item.key) {
								return item.rangePicker
							}
						}, forData.slotList)
						searchData = Object.assign(searchData, screeningTime(forData.selectKey, forData.value, keyList))
					}
					break
				case 'selectOption':
					searchData[forData.selectKey] = forData.value[forData.selectKey]
					break
				default:
					Object.assign(searchData, forData.value)
					break
			}
		}
	}
	return Object.assign(searchData, searchForm)
}

function setSearchRows(data: Array<SearchRow>, pageSate: ObjectMap, searchForm: ObjectMap, type: boolean) {
	if (!type) return {}
	const searchSlots: ObjectMap = {}
	const getPageSate = pageSate.value
	forEach((item) => {
		if (item.slotName && getPageSate[item.slotName]) {
			switch (getPageSate[item.slotName].slotType) {
				case 'rangePicker':
					searchSlots[item.slotName] = () => rangePickerSlot(pageSate, item.slotName)
					break
				case 'selectOption':
					searchSlots[item.slotName] = () => selectOptionSlot(pageSate, item.slotName)
					break
				default:
			}
		} else if (item.commonly && item.slotName) {
			if (item.commonly.type === 'rangePicker' && item.commonly.value.length > 1 && isArray(item.commonly.value)) {
				searchSlots[item.slotName] = () => {
					if (item.commonly && isArray(item.commonly.value)) {
						return setRRangePicker(
							{
								label: item.title,
								// eslint-disable-next-line @typescript-eslint/ban-ts-comment
								// @ts-ignore
								pickerTimeA: head(item.commonly.value),
								// eslint-disable-next-line @typescript-eslint/ban-ts-comment
								// @ts-ignore
								pickerTimeB: last(item.commonly.value),
							},
							searchForm,
						)
					}
					return false
				}
			}
		}
	}, data)
	return searchSlots
}

interface commonlyState {
	pageSate: ObjectMap
	searchForm: ObjectMap
	searchRows: Array<SearchRow>
	setSearchData?: (item: ObjectMap) => ObjectMap
	setRClearData?: () => void
	getPagination?: (item?: boolean) => void
	run: any
}

export function commonly({
	pageSate,
	searchForm,
	searchRows,
	setSearchData,
	getPagination,
	run,
	setRClearData,
}: commonlyState) {
	const defPageSate = clone(pageSate.value)
	const currySetSearchRows = curry(setSearchRows)
	const searchSlots = currySetSearchRows(searchRows, pageSate, searchForm)
	function resetSearchData() {
		searchForm.value = {}
		pageSate.value = clone(defPageSate)
	}

	function rSearchData() {
		let data: ObjectMap = {}
		if (setSearchData) {
			data = setSearchData(rSearchDataModel(pageSate.value, searchForm.value))
		} else {
			data = rSearchDataModel(pageSate.value, searchForm.value)
		}
		for (const i in data) {
			if (isNil(data[i])) {
				delete data[i]
			}
		}
		return data
	}

	function rSearch(is = true) {
		const Pagination = getPagination ? getPagination(is) : {}
		const data: ObjectMap = {
			...rSearchData(),
			...Pagination,
		}
		run(data)
	}

	function rClear(is = true) {
		if (setRClearData) {
			setRClearData()
		}
		resetSearchData()
		rSearch(is)
	}

	return { searchSlots, resetSearchData, rSearch, rSearchData, rClear }
}
