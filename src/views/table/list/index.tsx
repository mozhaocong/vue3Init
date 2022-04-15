import { defineComponent, ref } from 'vue'
import { Common, RSearch, RTable } from '@/components'
import { purchase_orders } from '@/api/erp/purchase'
import { SearchRow, TableRow } from '@/views/table/list/util'
import Modules from './modules'
const { useSearch, useRequest, commonly } = Common
export default defineComponent({
	name: 'table11',
	setup() {
		const { expand, expandToggle, searchForm } = useSearch<ObjectMap>({})
		const pageSate = ref({
			createBy: {
				isSearch: true,
				slotType: 'selectOption',
				slotList: [
					{ label: '创建人', key: 'createBy', component: 'a-input' },
					{ label: '当前处理人', key: 'currentHandler', component: 'a-input' },
				],
				selectKey: 'createBy',
				value: {},
			},
		}) // 搜索表单的特殊参数数据列表
		const searchRow = new SearchRow(searchForm).data // 搜索表单的数据列表
		const tableRow = new TableRow({ operation }).data // 表单的数据列表
		const moduleState = ref({}) //表单操作列 操作modules组件的参数
		function operation(item: ObjectMap) {
			moduleState.value = item
		}
		const { run, data, renderPagination, getPagination, loading, refresh } = useRequest(purchase_orders, {
			manual: true,
			pagination: true,
			defaultParams: [[]],
			paramsPaginationKey: {
				size: 'size',
				current: 'page',
			},
		})

		const { searchSlots, rSearch, rClear } = commonly({
			pageSate,
			searchForm,
			searchRows: searchRow,
			run,
			getPagination,
		})

		return () => (
			<>
				<RSearch
					searchKey="errorStatisticsReport"
					clear={rClear}
					loading={loading.value}
					search={rSearch}
					expand={{
						value: expand.value,
						expandToggle,
					}}
					v-slots={{
						...searchSlots(true),
					}}
					model={searchForm.value}
					rows={searchRow}
				/>
				<RTable dataSource={data.value?.data?.items} columns={tableRow} {...{ loading: loading.value }} />
				{renderPagination()}
				<Modules v-model={[moduleState.value, 'value']} />
			</>
		)
	},
})
