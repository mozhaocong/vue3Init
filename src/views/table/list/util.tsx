import { rSearchProps } from '@/config'
import { configCurryFilter } from '@/utils'
import { FormConfig } from '@/components'

export class SearchRow {
	data: SearchRowArray
	constructor(searchForm: ObjectMap) {
		this.data = [
			{
				title: '采购单检索',
				key: 'no',
				component: 'a-input',
				props: {
					...rSearchProps,
					// onChange: () => {
					// 	searchForm.value['no1'] = searchForm.value.no
					// },
				},
			},
			{
				title: '采购单检索1',
				key: 'no1',
				// component: 'a-input',
				component: <FormConfig />,
				props: {
					prop: 'yesNoStatus',
					...rSearchProps,
				},
			},
			{
				title: '采购单检索2',
				key: 'no2',
				component: 'a-input',
				props: {
					...rSearchProps,
				},
			},
			// {
			// 	title: '创建人',
			// 	key: 'createBy',
			// 	slotName: 'createBy',
			// },
		]
	}
}

export class TableRow {
	data: ObjectMap[]
	constructor(operationClick?: any) {
		this.data = [
			{
				title: '采购单',
				dataIndex: 'no',
				key: 'no',
			},
			{
				title: '类型名称',
				dataIndex: 'replenish_type_name',
				key: 'replenish_type_name',
			},
			{
				title: '类型',
				dataIndex: 'apply_type',
				key: 'apply_type',
				customRender: configCurryFilter('yesNoStatus'),
			},
			{
				title: '操作',
				dataIndex: 'operation',
				key: 'operation',
				customRender: (item: any) => {
					return (
						<>
							<div
								onClick={() => {
									operationClick.operation({ form: true })
								}}
							>
								打开Form1
							</div>
							<div
								onClick={() => {
									operationClick.operation({ form2: true })
								}}
							>
								打开Form2
							</div>
						</>
					)
				},
			},
		]
	}
}
