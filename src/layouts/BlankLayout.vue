<template>
  <div ref="root" class="blank-layout">
    <van-nav-bar
      :title="title"
      :right-arrow="rightArrow"
      :left-arrow="leftArrow"
      @click-left="onBack"
    >
      <template #right>
        <slot name="nav-right">
          <div v-if="rightArrow" @click="refreshMse"></div>
        </slot>
      </template>
    </van-nav-bar>
    <div class="container" :class="className">
      <keep-alive v-if="keepAlive">
        <slot></slot>
      </keep-alive>
      <slot v-else></slot>
    </div>
    <van-calendar v-model="state.showCalendar" @confirm="onCalendarConfirm" />
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { NavBar, Calendar } from 'vant'
import './basicLayout.less'

export default defineComponent({
  name: 'BlankLayout',
  components: {
    [NavBar.name]: NavBar,
    [Calendar.name]: Calendar
  },
  props: {
    leftArrow: {
      type: Boolean,
      default: true
    },
    rightArrow: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { attrs }) {
    const className = attrs.class

    const root = ref()
    const state = reactive({
      value: '',
      showCalendar: false
    })

    const route = useRoute()
    const router = useRouter()
    const { title, keepAlive = false } = route.meta

    // 返回
    const onBack = () => {
      router.back()
    }

    const onCalendarConfirm = (date: any) => {
      console.log(date)
    }

    onMounted(() => {
      root.value.className = 'blank-layout'
    })

    return {
      state,
      root,
      className,
      title,
      keepAlive,
      onBack,
      onCalendarConfirm
    }
  }
})
</script>
