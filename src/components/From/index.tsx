/*
 * 系统订单表单填写校验组件
 * @Author: mzc
 * @Date: 2021-08-20 15:30
 */
import { PropType, ref, defineComponent, h, resolveComponent, renderSlot, onMounted } from 'vue'
import { isString } from '@/utils'
import { is } from 'ramda'

function isFunction(fn: any): boolean {
	return is(Function, fn)
}

const Props = {
	formRef: {
		type: null,
		default: null,
	},
	labelCol: {
		type: Object as PropType<LabelCol>,
		default: () => {
			return { span: 6 }
		},
	},
	disabled: {
		type: Boolean as PropType<boolean>,
		default: false,
	},
	wrapperCol: {
		type: Object as PropType<LabelCol>,
		default: () => {
			return { span: 16 }
		},
	},
	rules: {
		type: Object as PropType<ObjectMap>,
		default: () => {
			return {}
		},
	},
	model: {
		type: Object as PropType<ObjectMap>,
		required: true,
	},
	rows: {
		type: Array as PropType<FromRow[]>,
		required: true,
	},
	colSpan: Number as PropType<number>,
	fid: {
		type: String as PropType<string>,
		default: 'r-form',
	},
	finish: Function as PropType<() => void>,
	finishFailed: Function as PropType<() => void>,
} as const
const From = defineComponent({
	name: 'r-from',
	props: Props,
	setup(props, { slots }) {
		const formRef = ref()

		onMounted(() => {
			if (props.formRef) props.formRef.value = formRef.value
		})

		function Hprops(row: any) {
			let data = {
				[row.modelValue ?? 'value']: props.model[row.key],
				[`onUpdate:${row.modelValue ?? 'value'}`]: ($event: string | ObjectMap | number) =>
					(props.model[row.key] = $event), //key = id , props.model = customerManagementDetail.id = $event
			}
			if (row.keys) {
				row.keys.forEach((res: string[]) => {
					const keysObj = {
						[res[1] ?? 'value']: props.model[res[0]],
						[`onUpdate:${res[1] ?? 'value'}`]: ($event: string | ObjectMap | number) => (props.model[res[0]] = $event),
					}
					data = {
						...data,
						...keysObj,
					}
				})
			}
			return data
		}

		function renderData(props: any) {
			if (isFunction(props)) {
				return props()
			} else {
				return props
			}
		}

		return () => {
			return (
				<div>
					{renderSlot(slots, 'header')}
					<div>
						<a-form
							layout="horizontal"
							id={props.fid}
							model={props.model}
							rules={props.rules}
							className="ant-advanced-search-form"
							labelCol={props.labelCol}
							wrapperCol={props.wrapperCol}
							ref={formRef}
							onFinish={props.finish}
							onFinishFailed={props.finishFailed}
						>
							<a-row>
								{props.rows.map((row) => {
									return renderData(row.display) === false ? (
										''
									) : (
										<a-col span={row.colSpan ?? props.colSpan ?? 6} key={row.key}>
											{row.render ? (
												row.render()
											) : row.slotName && slots[row.slotName] ? (
												renderSlot(slots, row.slotName)
											) : (
												<a-form-item
													label={row.title}
													name={row.key}
													{...{ wrapperCol: row.wrapperCol, labelCol: row.labelCol, rules: row.rules ?? [] }}
												>
													{row.customRender
														? row.customRender({ text: props.model[row.key], record: props.model })
														: h(
																row.component
																	? isString(row.component)
																		? resolveComponent(row.component)
																		: row.component
																	: resolveComponent('a-input'),
																{
																	getPopupContainer: (triggerNode: any) => triggerNode.parentNode, // a-select 显示问题
																	...row.props,
																	...Hprops(row),
																	disabled: row.props?.disabled ?? props.disabled,
																},
														  )}
												</a-form-item>
											)}
										</a-col>
									)
								})}
							</a-row>
						</a-form>
					</div>
					{renderSlot(slots, 'footer')}
				</div>
			)
		}
	},
})

export default From
