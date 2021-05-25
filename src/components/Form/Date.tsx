import { defineComponent, onMounted, reactive, watch } from 'vue'
import { Field, Popup, DatetimePicker } from 'vant'
import dayjs from 'dayjs'

export default defineComponent({
  name: 'MDate',
  props: {
    name: String,
    rules: Array,
    label: String,
    modelValue: String,
    type: {
      type: String,
      default: 'date'
    },
    minDate: {
      type: Date,
      default: new Date(1900, 0, 1)
    },
    maxDate: {
      type: Date,
      default: new Date()
    },
    placeholder: {
      type: String,
      default: '请选择日期'
    }
  },
  emits: [
    'update:modelValue'
  ],
  setup (props, { emit }) {
    const state = reactive({
      showValue: '',
      value: new Date(),
      minDate: props.minDate,
      maxDate: props.maxDate,
      showPicker: false
    })

    const onShowPicker = () => {
      state.showPicker = true
    }

    const onConfirm = (values: Date) => {
      const map = {
        date: 'YYYY-MM-DD',
        'year-month': 'YYYY-MM'
      }
      state.showValue = dayjs(values).format(map[props.type])
      state.showPicker = false
      emit('update:modelValue', state.showValue)
    }

    const onCancel = () => {
      state.showPicker = false
    }

    const updateValue = (value: string | undefined) => {
      if (!value) {
        state.value = new Date()
        state.showValue = ''
      }
      if (value && state.showValue !== props.modelValue) {
        state.value = dayjs(value).toDate()
        state.showValue = value
      }
    }

    watch(() => props.modelValue,
      (newVal) => {
        updateValue(newVal)
      }
    )

    onMounted(() => {
      if (props.modelValue) {
        updateValue(props.modelValue)
      }
    })

    return () => (
      <>
        <Field
          required
          readonly
          clickable
          label={props.label}
          name={props.name}
          placeholder={props.placeholder}
          rules={props.rules}
          v-model={state.showValue}
          onClick={onShowPicker} />
        <Popup show={state.showPicker} position="bottom">
          <DatetimePicker
            type={props.type}
            v-model={state.value}
            min-date={state.minDate}
            max-date={state.maxDate}
            onConfirm={onConfirm}
            onCancel={onCancel}
          />
        </Popup>
      </>
    )
  }
})
