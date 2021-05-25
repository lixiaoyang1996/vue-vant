<template>
  <div class="basic-layout">
    <van-nav-bar fixed :title="title"></van-nav-bar>
    <router-view class="container" />
    <van-tabbar route>
      <van-tabbar-item name="home" icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item name="list" icon="bar-chart-o" to="/charts"
        >图标</van-tabbar-item
      >
      <van-tabbar-item name="firend" icon="orders-o" to="/form">表单</van-tabbar-item>
      <!-- <van-tabbar-item name="setting" icon="setting-o">设置</van-tabbar-item> -->
    </van-tabbar>
  </div>
</template>

<script lang="ts">
import { useRoute } from 'vue-router'
import { defineComponent, computed } from 'vue'
import './basicLayout.less'

export default defineComponent({
  setup() {
    const route = useRoute()
    const title = computed(() => route.meta.title)
    return {
      title
    }
  }
})
</script>
