<template>
  <div class="user-login">
    <img class="logo" src="@/assets/logo.svg" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="account"
        name="account"
        maxlength="11"
        left-icon="contact"
        placeholder="账户"
        :rules="rules.account"
      />
      <van-field
        v-model="password"
        name="password"
        type="password"
        left-icon="lock"
        placeholder="密码"
        :rules="rules.password"
      >
      </van-field>
      <van-button type="primary" block native-type="submit">登录</van-button>
    </van-form>
    <div class="link-cell">
      <router-link to="/home">忘记密码？</router-link>
      <router-link to="/home">注册</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import request from '@/utils/request'
import { useRouter } from 'vue-router'

const rules = {
  account: [{ required: true, message: '请输入你的账户' }],
  password: [{ required: true, message: '请输入你的密码' }]
}

export type LoginType = {
  account: string
  password: string
  loginType?: string
  type?: string
}

export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()
    const state = reactive({
      account: '',
      password: '',
      rules: Object.freeze(rules)
    }) as LoginType

    const onSubmit = async (values: any) => {
      const params = Object.assign(values, { loginType: '1', type: '0' })
      const { data } = await request.post('login.html', params)
      store.dispatch('accountModule/setToken', data)
      await store.dispatch('accountModule/GetUserInfo')
      router.push({ path: '/home' })
    }

    return {
      ...toRefs(state),
      onSubmit
    }
  }
})
</script>

<style lang="less">
@import url('./index.less');
</style>
