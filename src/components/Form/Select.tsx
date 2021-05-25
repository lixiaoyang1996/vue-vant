import { computed, defineComponent, reactive, ref, watch } from 'vue'
import { Field, Cell, Popup, Picker } from 'vant'
import { useStore } from 'vuex'

type DictType = {
  text: string
  value: string
}

export default defineComponent({
  name: 'MSelect',
  props: {
    modelValue: String,
    name: String,
    label: String,
    readonly: Boolean,
    required: Boolean,
    placeholder: {
      type: String,
      default: '请选择'
    },
    rules: Array,
    type: String
  },
  setup(props, { emit }) {
    const store = useStore()
    const columns = ref()
    let dict: any
    const state = reactive({
      value: props.modelValue,
      pickerText: props.placeholder,
      show: false,
      groupChecked: [] as string[]
    })

    // 显示选中文本
    const showSelectText = () => {
      if (props.modelValue) {
        const found = dict.value.find(
          (item: DictType) => item.value === props.modelValue
        )
        if (found) {
          state.pickerText = found.text
        }
      }
    }

    if (props.type) {
      store.dispatch('dict/fetchDict', props.type)
      dict = computed(() => store.state.dict[props.type as string])
      watch(dict, (options) => {
        columns.value = options.map((item: DictType) => item.text)
        // 显示选中文本
        showSelectText()
      })
    }

    const updateValue = (value: string) => {
      if (value !== props.modelValue) {
        const found = dict.value.find((item: DictType) => item.text === value)
        emit('update:modelValue', found.value || value)

        // state.pickerText = text as string
      }
      // 显示选中文本
      showSelectText()
    }

    // 多选更新
    // const updateValueMultiple = (value: string) => {
    //   if (value !== props.modelValue) {
    //     // const found = dict && dict.value.find((item: DictType) => item.text === value)
    //     // const text = value
    //     // let val = value
    //     // if (found) {
    //     //   val = found.value
    //     // }
    //     // emit('update:modelValue', val)
    //     // state.pickerText = text as string
    //   }

    //   // const found = dict && dict.value.find((item: DictType) => item.value === props.modelValue)
    //   // if (found) {
    //   //   state.pickerText = found.text
    //   // }
    // }

    watch(
      () => props.modelValue,
      (newVal) => {
        updateValue(newVal as string)
      }
    )

    function showPopup() {
      if (props.readonly) {
        return
      }
      state.show = !state.show
    }

    // 单选确认
    function onConfirm(value: string) {
      state.value = value
      state.show = false
      updateValue(value)
    }

    return () => {
      return (
        <div class="m-select">
          <Cell
            class="select-cell"
            border={false}
            required={props.required}
            title={props.label}
            value-class={{ 'select-option': state.pickerText !== props.placeholder }}
            value={state.pickerText}
            is-link={!props.readonly}
            onClick={showPopup}
          />
          <Field {...props} readonly input-align="right" is-link={!props.readonly} />
          <Popup round show={state.show} onClickOverlay={showPopup} position="bottom">
            {
              <Picker
                columns={columns.value}
                onConfirm={onConfirm}
                onCancel={showPopup}
              />
            }
          </Popup>
        </div>
      )
    }
  }
})
