<template>
  <!-- <router-view #="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive> -->
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  components: {}
})
</script>

<style lang="less">
#app {
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
</style>
