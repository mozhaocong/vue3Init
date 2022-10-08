/*
 * 系统订单表单填写校验组件
 * @Author: mzc
 * @Date: 2021-08-20 15:30
 */

import { PropType, ref, defineComponent, renderSlot, onMounted, App, Plugin, markRaw } from 'vue'
import RFormItem from './components/FormItem'
import { formItemConfig, formItemProps, formProps, setFormConfig } from './util'
import { Form } from 'ant-design-vue'
import { FormRowArray } from './tsType'
import { deepClone } from 'html-mzc-tool'

export const Props = {
	model: {
		type: Object as PropType<ObjectMap>,
		required: true,
		notes: 'form表单双向绑定的值 可以理解成正常的的v-model',
		parameter: 'const model =ref({})   model={model.value}',
	},
	rows: {
		type: Array as PropType<FormRowArray>,
		required: true,
		notes:
			'form表单的显示列表参数 form显示先是看公共参数在到rows里的参数值 所以rows权重最高 不要求ref或者reactive rows直接在return循环输出',
		parameter: "const rows =[{key:'a', title:'a'}]   rows={rows}",
	},
	...formProps,
	...formItemProps,
} as const
console.log('Props', deepClone(Props))
const _Form = defineComponent({
	name: 'RForm',
	props: Props,
	setup(props, { slots }) {
		const formRef = ref()
		onMounted(() => {
			if (props.formRef) props.formRef.value = formRef.value
		})

		return () => {
			return (
				<div>
					{renderSlot(slots, 'header')}
					<div>
						<Form ref={formRef} {...setFormConfig(props)}>
							<RFormItem
								formItemStyle={props.formItemStyle}
								model={props.model}
								rows={props.rows}
								v-slots={slots}
								{...formItemConfig(props)}
							/>
						</Form>
					</div>

					{renderSlot(slots, 'footer')}
				</div>
			)
		}
	},
})

_Form.install = function (app: App) {
	app.component(_Form.name, _Form)
	return app
}

export default markRaw(_Form) as typeof _Form & Plugin
