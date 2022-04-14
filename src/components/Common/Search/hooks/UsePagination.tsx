import { pick } from 'ramda'
import { ref } from 'vue'
import { Pagination } from 'ant-design-vue'

export enum PageType {
	new,
}
export interface getPaginationDto {
	current: number
	size: number
}
export interface Pagination {
	showTotal?: (total: number) => string
	pageSizeOptions?: Array<string>
	showQuickJumper?: boolean
	showSizeChanger?: boolean
}

export interface DefaultConfig extends Pagination {
	pageSize: number
}
/**
 * 集成分页
 * @param search
 * @returns
 */
export function usePagination(search: (type?: PageType) => void, defaultConfig?: DefaultConfig) {
	const total = ref(0)
	const pageSize = ref(defaultConfig?.pageSize ?? 10)
	const current = ref(0)
	function getPagination(is = false): getPaginationDto {
		if (is) {
			current.value = 1
		}
		return {
			current: current.value,
			size: pageSize.value,
		}
	}
	function handleSizeChange(index: number, size: number) {
		current.value = 1
		pageSize.value = size
		search()
	}
	function handleCurrentChange(index: number, size: number) {
		current.value = index
		pageSize.value = size
		search(PageType.new)
	}
	function renderPagination(props?: Pagination) {
		const prop = pick(
			['showTotal', 'pageSizeOptions', 'showQuickJumper', 'showSizeChanger'],
			props ?? defaultConfig ?? {},
		)
		return (
			<div class="fenye">
				<Pagination
					current={current.value}
					total={total.value}
					showTotal={(total: number) => `共 ${total} 条`}
					onShowSizeChange={handleSizeChange}
					onChange={handleCurrentChange}
					pageSizeOptions={['10', '20', '40', '50', '100', '200']}
					show-size-changer
					showQuickJumper={total.value / pageSize.value > 5}
					pageSize={pageSize.value}
					{...prop}
				/>
			</div>
		)
	}
	return {
		total,
		pageSize,
		current,
		renderPagination,
		getPagination,
	}
}
