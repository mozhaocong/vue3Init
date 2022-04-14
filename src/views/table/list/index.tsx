import { defineComponent, ref } from 'vue'
import { Common, PassWordInput } from '@/components'
import { purchase_orders } from '@/api/erp/purchase'
const { useSearch, useRequest, Rsearch } = Common
export default defineComponent({
	name: 'test',
	setup() {
		const row = ref<SearchRowArray>([
			{
				title: '订单编号',
				key: 'soOrderNo',
				component: 'a-input',
				props: {
					allowClear: true,
				},
			},
			{
				title: '来源单号1',
				key: 'spOrderNo1',
				component: 'a-input',
				props: {
					allowClear: true,
				},
			},
			{
				title: '来源单号',
				key: 'spOrderNo',
				component: 'a-input',
				props: {
					allowClear: true,
				},
			},
			{
				title: '来源单号',
				key: 'spOrderNo',
				component: 'a-input',
				props: {
					allowClear: true,
				},
			},
		])
		setTimeout(() => {
			row.value.push({
				title: '来源单号',
				key: 'spOrderNo',
				component: 'a-input',
				props: {
					allowClear: true,
				},
			})
		}, 1000)
		const { run, data, renderPagination, getPagination, loading, refresh } = useRequest(purchase_orders, {
			manual: true,
			pagination: true,
			defaultParams: [[]],
			onSuccess: (value) => {
				console.log(value)
			},
		})
		setTimeout(() => {
			console.log(data.value)
		}, 1000)
		const { expand, expandToggle, searchForm } = useSearch<ObjectMap>({})
		function RClear() {
			console.log(1)
		}
		function rSearch() {
			console.log(2)
		}
		return () => (
			<Rsearch
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 14 }}
				searchKey="errorStatisticsReport"
				clear={RClear}
				// loading={loading.value}
				search={rSearch}
				expand={{
					value: expand.value,
					expandToggle,
				}}
				v-slots={{}}
				model={searchForm.value}
				rows={row.value}
			/>
		)
	},
})
