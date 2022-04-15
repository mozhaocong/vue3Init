import { rSearchProps } from '@/config'
import { FormConfig } from '@/components'

export class FormRow {
	data: FromRowArray
	constructor(formModel: ObjectMap) {
		this.data = [
			{
				title: '供应商1',
				key: 'no',
				component: 'a-input',
				props: {
					...rSearchProps,
				},
				rules: [{ required: true, message: '期望收款日期不能为空', trigger: 'change' }],
			},
			{
				title: '补货方式2',
				key: 'no1',
				component: 'a-input',
				props: {
					...rSearchProps,
				},
			},
			{
				title: '是否补货',
				key: 'no2',
				component: <FormConfig />,
				props: {
					prop: 'yesNoStatus',
					...rSearchProps,
				},
			},
		]
	}
}
