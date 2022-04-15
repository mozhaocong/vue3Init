import RSearch from './Search/index'
import RTable from './Table/index'
import RForm from './From'
//辅助工具类
import { useRequest } from './Search/hooks/UseRequest'
import { usePagination } from './Search/hooks/UsePagination'
import { useSearch } from './Search/hooks/UseSearch'
import { commonly } from './Search/hooks/PublicMethod'

export default { RSearch, RTable, RForm, useRequest, usePagination, useSearch, commonly }
