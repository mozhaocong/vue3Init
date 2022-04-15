interface LabelCol {
	span?: number
	offset?: number
	style?: { width: string }
}
interface RowConf {
	key: string
	title: string
	keys?: Array<[string, string]> // [['value', 'value1'], ['value2', 'value3']]
	sort?: number
	required?: boolean
	show?: boolean
	colSpan?: number
	wrapperCol?: LabelCol
	labelCol?: LabelCol
	modelValue?: string
	customRender?: (item: { text: any; record: ObjectMap }) => void
	rules?: ObjectMap | array[]
}

interface FromRow extends RowConf {
	render?: () => JSX.Element
	component?: string | any
	slotName?: string
	props?: ObjectMap
	display?: (() => boolean) | boolean
}

type FromRowArray = FromRow[]
