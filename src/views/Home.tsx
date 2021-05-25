import { defineComponent, reactive, ref } from 'vue'
import { CellGroup, Cell } from 'vant'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'Home',
  setup() {
    const store = useStore()
    const router = useRouter()

    const list = ref<any[]>([])
    list.value = [{ title: '企业信息' }, { title: '企业认证' }, { title: '企业员工' }]

    const state = reactive({
      flag: false
    })
    const stop = (item: any) => {
      router.push({ name: 'Detail', params: { title: item.title } })
    }

    const renderItem = (item: any) => {
      return (
        <div key={item.title} onClick={() => stop(item)}>
          {item.title}
        </div>
      )
    }

    return () => {
      const { flag } = state
      return (
        <div class="main">
          {/* {flag && <div>{store.state.name}</div>}
          {!flag && <div>11111</div>} */}
          <CellGroup>{list.value.map(renderItem)}</CellGroup>
        </div>
      )
    }
  }
})
