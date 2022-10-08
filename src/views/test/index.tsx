import { defineComponent, PropType, ref } from 'vue'
import RForm, { Props as formProps } from '@/component/Form'
import { FormRowArray } from '@/component/Form/tsType'
import { Button, Input } from 'ant-design-vue'
import { deepClone } from 'html-mzc-tool'

const propsTest = {
	layout: {
		type: String as PropType<'horizontal' | 'vertical' | 'inline'>,
		default: 'horizontal',
	},
}

type test = typeof propsTest
type test1 = keyof test
type getTestType<T> = T extends { type: infer G } ? G : never
type test2 = {
	[T in keyof test]: getTestType<test[T]>
}
export default defineComponent({
	name: 'layout',
	setup() {
		const data = {
			a: 2,
			dL: 3,
		}
		const rows: FormRowArray = [
			{
				key: 'a',
				title: '测试',
				rules: { required: true, type: 'string' },
				component: () => <Input />,
			},
		]
		const mode = ref({})
		console.log(data)

		return () => (
			<div>
				<RForm key={'test'} rows={rows} model={mode.value} />
				<div>{JSON.stringify(mode.value)}</div>
				<Button
					onClick={() => {
						console.log(mode.value)
					}}
				>
					点击事件
				</Button>
			</div>
		)
	},
})
