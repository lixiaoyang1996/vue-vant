import { defineComponent, reactive } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'Detail',
  setup() {
    const route = useRoute()
    const state = reactive({
      name: '1111'
    })

    return () => {
      return <blank-layout class="page-jobinfo-map">{route.params.title}</blank-layout>
    }
  }
})
