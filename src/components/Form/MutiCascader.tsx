
import { computed, defineComponent, reactive, ref, watch } from 'vue'
import { Field, Popup, Cascader, Notify } from 'vant'
import { useStore } from 'vuex'
import './MutiCascader.less'

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
    lxjp: String,
    mutiSelectList: Array,
    onSelectList: Function
  },
  emits: [
    'update:modelValue',
    'selectList'
  ],
  setup (props, { emit }) {
    const store = useStore()
    const columns = ref()
    let dict: any
    const list: Array<Record<string, any>> = []
    const state = reactive({
      show: false,
      fieldValue: '',
      cascaderValue: '',
      selectedArray: list
    })

    if (props.lxjp) {
      store.dispatch('dict/AxiosDict', props.lxjp)
      dict = computed(() => store.state.dict[(props.lxjp as string)])
      watch(dict, (newVal) => {
        columns.value = newVal
      })
    }

    const updateSelectArray = (obj: any) => {
      state.selectedArray.push(obj)
      emit('selectList', state.selectedArray)
    }

    const updateValue = (value: string | undefined) => {
      if (value !== props.modelValue) {
        updateSelectArray({
          text: state.fieldValue,
          code: value
        })
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
          state.fieldValue = options.join('')
          state.cascaderValue = list[list.length - 1]
        }
      }
    }

    watch(() => props.modelValue,
      (val) => {
        updateValue(val)
      }
    )

    const setSelectVal = (list: any) => {
      state.selectedArray = list
      emit('selectList', state.selectedArray)
    }

    watch(() => props.mutiSelectList,
      (val) => {
        setSelectVal(val)
      }
    )

    function showPopup () {
      state.show = !state.show
    }

    function onFinish ({ selectedOptions }: any) {
      if (state.selectedArray.length > 4) {
        Notify({ type: 'warning', message: '最多只能选择五个！' })
        return false
      }
      // state.show = false
      state.fieldValue = selectedOptions.map((option: any) => option.text).join('/')
      const value = selectedOptions.map((option: any) => option.value)

      updateValue(JSON.stringify(value))
    }

    const deleteSelectArea = (thisObj: any) => {
      const index = state.selectedArray.findIndex((item: any) => item.code === thisObj.code)
      if (index !== -1) {
        state.selectedArray.splice(index, 1)
        // emit('update:modelValue', state.selectedArray)
      }
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
            <div class="select-wrap">
              {
                state.selectedArray.map(item => {
                  return <div class="select-node"><span>{ item.text }</span><div onClick={() => deleteSelectArea(item)} class="delete-select"></div></div>
                })
              }
            </div>
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
