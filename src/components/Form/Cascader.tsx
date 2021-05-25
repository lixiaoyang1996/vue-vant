
import { computed, defineComponent, reactive, ref, watch } from 'vue'
import { Field, Popup, Cascader } from 'vant'
import { useStore } from 'vuex'

export type ColumnType = {
  text: string;
  value: string;
}

export default defineComponent({
  name: 'MSelect',
  props: {
    modelValue: String,
    name: String,
    label: String,
    readonly: Boolean,
    required: Boolean,
    placeholder: String,
    rules: Array,
    type: String
  },
  emits: [
    'update:modelValue'
  ],
  setup (props, { emit }) {
    const store = useStore()
    const columns = ref()
    let dict: any
    const state = reactive({
      show: false,
      fieldValue: '',
      cascaderValue: ''
    })

    if (props.type) {
      store.dispatch('dict/fetchDict', props.type)
      dict = computed(() => store.state.dict[props.type as string])
      watch(dict, (newVal) => {
        columns.value = newVal
      })
    }

    const updateValue = (value: string | undefined) => {
      if (value !== props.modelValue) {
        emit('update:modelValue', value)
      }
      if (dict.value) {
        if (props.modelValue && !state.cascaderValue) {
          const list = JSON.parse(value as string)
          let dictList = dict.value
          const options: any[] = []
          for (let i = 0; i < list.length; i++) {
            const found = dictList.find((item: any) => item.value === list[i])
            if (found) {
              dictList = found.children
              options.push(found.text)
            }
          }

          state.fieldValue = options.join('/')
          state.cascaderValue = list[list.length - 1]
        }
      }
    }

    watch(() => props.modelValue,
      (val) => {
        updateValue(val)
      }
    )

    function showPopup () {
      state.show = !state.show
    }

    function onFinish ({ selectedOptions }: any) {
      state.show = false
      state.fieldValue = selectedOptions.map((option: any) => option.text).join('/')
      const value = selectedOptions.map((option: any) => option.value)
      updateValue(JSON.stringify(value))
    }

    return () => {
      return (
        <div class="m-cascader">
          <Field
            is-link
            readonly
            required={props.required}
            label={props.label}
            placeholder={props.placeholder}
            input-align="right"
            rules={props.rules}
            v-model={state.fieldValue}
            onClick={showPopup} />
          <Popup show={state.show} round position="bottom">
            <Cascader
              title={props.placeholder}
              options={columns.value}
              v-model={state.cascaderValue}
              onFinish={onFinish}
              onClose={showPopup} />
          </Popup>
        </div>
      )
    }
  }
})
