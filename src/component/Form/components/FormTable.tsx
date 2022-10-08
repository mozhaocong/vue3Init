import { defineComponent, PropType } from 'vue'
import { Form, Table } from 'ant-design-vue'
import { isTrue } from '@/utils'
import RFormItem from '@/component/Form/components/FormItem'
import { formItemConfig, formProps, formRulesName, setFormConfig } from '@/component/Form/util'
import { isFunctionOfOther } from '@/utils'

import { ColumnGroupType, ColumnType } from 'ant-design-vue/lib/table/interface'
import { FormRowArray } from '../tsType'

interface formTableColumns extends ColumnType<any> {
	row?: FormRowArray
	display?: () => boolean | boolean
}
interface formTableColumnsGroup extends ColumnGroupType<any> {
	row?: FormRowArray
	display?: () => boolean | boolean
}
type formTableColumnsType = (formTableColumns | formTableColumnsGroup)[]

const Props = {
	model: {
		type: Array as PropType<any[]>,
		required: true,
	},
	columns: {
		type: Array as PropType<formTableColumnsType>,
		required: true,
	},
	rowKey: Array as PropType<any[]>,
	pagination: {
		type: Boolean as PropType<boolean>,
		default: false,
	},
	...formProps,
} as const
export default defineComponent({
	props: Props,
	setup(props, { slots }) {
		return () => {
			let columnsList = props.columns.map((item: any) => {
				const data: ObjectMap = {}
				if (!item.customRender && isTrue(item.row)) {
					data.customRender = ({ record, index }: any) => {
						const listRows = item.row.map((res: any) => {
							return {
								colProps: { span: 24 },
								formItemProps: {
									wrapperCol: { span: 24 },
									labelCol: { span: 0 },
								},
								...res,
								name: formRulesName(props, res, index),
							}
						})
						return <RFormItem model={record} rows={listRows} v-slots={slots} {...formItemConfig(props)} />
					}
				}
				return { ...item, ...data }
			})
			columnsList = columnsList.filter((item) => {
				return isFunctionOfOther(item.display) !== false
			})
			const table = <Table pagination={props.pagination as any} dataSource={props.model} columns={columnsList} />
			return !isTrue(props.rowKey) ? (
				<Form model={props.model} {...setFormConfig(props)}>
					{table}
				</Form>
			) : (
				table
			)
		}
	},
})
