import { defineComponent, reactive, watch } from 'vue'
import { rangePickerShowTime, valueFormat } from '@/config'
import { RangePicker } from 'ant-design-vue'

const propsData = {
	pickerTimeA: {
		type: String,
	},
	pickerTimeB: {
		type: String,
	},
} as const
export default defineComponent({
	props: propsData,
	name: 'RRangePicker',
	setup(props, context) {
		const rangeTime: any[] = []
		const data = reactive({
			timeData: rangeTime,
		})
		data.timeData.push(props.pickerTimeA, props.pickerTimeB)
		watch(
			() => props.pickerTimeA,
			(count) => {
				if (data.timeData[0] === count) return
				data.timeData[0] = count
			},
		)
		watch(
			() => props.pickerTimeB,
			(count) => {
				// if (!count) return
				if (data.timeData[1] === count) return
				data.timeData[1] = count
			},
			// { immediate: true }
		)

		function onChange(value: any[], mode: any) {
			context.emit('onChange', value, mode)
			context.emit('update:pickerTimeA', value[0])
			context.emit('update:pickerTimeB', value[1])
		}
		return () => (
			<RangePicker
				v-model={[data.timeData, 'value']}
				onChange={onChange}
				style={{ width: '100%' }}
				showTime={rangePickerShowTime}
				valueFormat={valueFormat}
				{...{
					...context.attrs,
				}}
			/>
		)
	},
})
