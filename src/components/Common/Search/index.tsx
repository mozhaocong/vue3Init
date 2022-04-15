import { PropType, ref, defineComponent, App, Plugin, h, resolveComponent, renderSlot, watchEffect, watch } from 'vue'
import { DownOutlined, SettingOutlined } from '@ant-design/icons-vue'
import { Row, Col } from 'ant-design-vue'
import { isEmpty, isNil, equals, is } from 'ramda'
import { isString, makeMap } from './tools'
import { clone } from 'ramda'
import Rconfigure from '../Configure'
import { deepClone, isTrue } from '@/utils'
const Props = {
	labelCol: {
		type: Object as PropType<LabelCol>,
		default: () => {
			return { span: 6 }
		},
	},
	wrapperCol: {
		type: Object as PropType<LabelCol>,
		default: () => {
			return { span: 16 }
		},
	},
	model: {
		type: Object as PropType<ObjectMap>,
		required: true,
	},
	layout: {
		type: String as PropType<'horizontal' | 'vertical' | 'inline'>,
		default: 'horizontal',
	},
	rows: {
		type: Array as PropType<SearchRow[]>,
		required: true,
	},
	expand: Object as PropType<{
		expandToggle: () => void
		value: boolean
	}>,
	lineLength: {
		type: Number as PropType<number>,
		default: 3,
	},
	clear: {
		type: Function as PropType<() => void>,
		required: true,
	},
	search: {
		type: Function as PropType<() => void>,
		required: true,
	},
	loading: Boolean as PropType<boolean>,
	searchKey: {
		type: String as PropType<string>,
		required: true,
	},
} as const

// 后面考虑更新问题
// eslint-disable-next-line @typescript-eslint/ban-types
function isFunction(fn: any): fn is Function {
	return is(Function, fn)
}
const Rsearch = defineComponent({
	name: 'r-search',
	props: Props,
	setup(props, { slots }) {
		const customRow = ref<RowConf[]>([]) // 用户自定义的
		const customRowStr = localStorage.getItem(props.searchKey + '-search')
		if (customRowStr) {
			try {
				const locColumns = JSON.parse(customRowStr)
				const colMap = makeMap(locColumns, 'key')
				// 需要判断更新版本之后新增字段
				if (!equals(locColumns.length, props.rows.length)) {
					props.rows.forEach((item) => {
						if (item.key && colMap.has(item.key)) {
							return
						}
						const show = item.required || isNil(item.show) ? true : item.show
						locColumns.push({
							show,
							required: item.required ?? false,
							title: item.title,
							key: item.key,
						})
					})
					localStorage.setItem(props.searchKey + '-search', JSON.stringify(locColumns))
				}
				customRow.value = locColumns
			} catch (e) {
				console.log(e)
			}
		}
		initCustomRow()
		function initCustomRow() {
			if (isEmpty(customRow.value)) {
				customRow.value = props.rows.map((item, index) => {
					const required = isNil(item.required) ? false : item.required
					const show = required ? true : isNil(item.show) ? index < props.lineLength : item.show
					return {
						key: item.key,
						title: item.title,
						sort: index,
						required,
						show,
						colSpan: item.colSpan ?? 6,
					}
				})
			}
		}
		const visible = ref(false)
		const rows = ref<SearchRow[]>([]) // 过滤之后的
		function custom() {
			visible.value = true
		}

		setRows(props.rows)
		function setRows(value: SearchRow[]) {
			const data = customRow.value
				.filter((item) => item.show)
				.map((item) => {
					const filterData = value.filter((valueItem) => item.key === valueItem.key) || []
					return filterData[0]
				})
			rows.value = deepClone(data)
		}

		function submit(row: RowConf[]) {
			customRow.value = row
			initCustomRow()
			localStorage.setItem(props.searchKey + '-search', JSON.stringify(row))
			setRows(props.rows)
		}
		function renderRowProps(porps: any) {
			if (isFunction(porps)) {
				return porps()
			} else {
				return porps
			}
		}

		watch(
			() => props.rows,
			(value) => {
				setRows(value)
			},
			{ deep: true },
		)
		return () => {
			return (
				<>
					<div class="top-search-from-nowidth top-search-from">
						{renderSlot(slots, 'header')}
						<div>
							<a-form
								className="ant-advanced-search-form"
								labelCol={props.labelCol ?? { span: 8 }}
								wrapperCol={props.wrapperCol ?? { span: 14 }}
							>
								<Row>
									{rows.value.map((row, index) => {
										if (!isTrue(row)) {
											return ''
										}
										if (index + 1 > props.lineLength) {
											if (isTrue(props?.expand?.value)) {
												if (!props?.expand?.value) {
													return ''
												}
											}
										}
										return (
											<Col span={row.colSpan ?? 6} key={row.key}>
												{row.render ? (
													row.render()
												) : row.slotName && slots[row.slotName] ? (
													renderSlot(slots, row.slotName)
												) : (
													<a-form-item label={row.title} name={row.key} {...{ wrapperCol: row.wrapperCol }}>
														{h(isString(row.component) ? resolveComponent(row.component) : row.component, {
															...renderRowProps(row.props),
															[row.modelValue ?? 'value']: props.model[row.key],
															[`onUpdate:${row.modelValue ?? 'value'}`]: ($event: any) =>
																(props.model[row.key] = $event),
														})}
													</a-form-item>
												)}
											</Col>
										)
									})}
									<Col span={6}>
										<a-form-item style="padding-left:10px" labelCol={{ span: 0 }} wrapperCol={{ span: 20 }}>
											<a-button type="primary" loading={props.loading} onClick={props.search}>
												查询
											</a-button>
											<a-button onClick={props.clear}>清除</a-button>
											{props.expand && rows.value.length > props.lineLength && (
												<a class="expand" onClick={props.expand.expandToggle}>
													<DownOutlined rotate={props.expand.value ? 180 : 0} />
													{props.expand.value ? '收起' : '更多'}
												</a>
											)}
											<a class="expand" onClick={custom}>
												<a-tooltip placement="topLeft" title="自定义显示">
													<SettingOutlined />
												</a-tooltip>
											</a>
										</a-form-item>
									</Col>
								</Row>
							</a-form>
						</div>
					</div>
					<Rconfigure
						v-model={visible.value}
						onSubmit={submit}
						title="查询条件调整自定义"
						columns={clone(customRow.value) as any}
					/>
				</>
			)
		}
	},
})

Rsearch.install = function (app: App) {
	app.component(Rsearch.name, Rsearch)
	return app
}
interface searchHookes {
	useRequest: any
	usePagination: any
	useSearch: any
}

export default Rsearch as typeof Rsearch & Plugin & searchHookes
