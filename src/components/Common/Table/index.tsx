import { defineComponent, ref, watch, PropType, App, Plugin, markRaw } from 'vue'
import { Table } from 'ant-design-vue'
import { deepClone } from '@/utils'
const propsData = {
	dataSource: {
		type: Array as PropType<any[]>,
		default() {
			return []
		},
	},
	columns: {
		type: Array as PropType<any[]>,
		default() {
			return []
		},
	},
} as const

const _Table = defineComponent({
	props: propsData,
	name: 'RTable',
	setup(props, context) {
		const dataSource = ref<any[]>([])
		const columns = ref<any[]>([])
		watch(
			() => props.dataSource,
			(value) => {
				dataSource.value = deepClone(value)
			},
			{ deep: true, immediate: true },
		)
		watch(
			() => props.columns,
			(value) => {
				columns.value = deepClone(value)
			},
			{ deep: true, immediate: true },
		)
		return () => <Table dataSource={dataSource.value} columns={columns.value} {...context.attrs} />
	},
})

_Table.install = function (app: App) {
	app.component(_Table.name, _Table)
	return app
}
export default markRaw(_Table) as typeof _Table & Plugin
