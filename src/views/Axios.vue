<template>
  <div class="tabbar-form">
    <van-form input-align="right" error-message-align="right" @submit="onSubmit">
      <van-field
        v-model="userName"
        required
        name="userName"
        label="用户名"
        placeholder="请输入用户名"
        autocomplete="off"
        :rules="rules.userName"
      />
      <m-select
        v-model="sex"
        required
        label="性别"
        name="sex"
        placeholder="请选择性别"
        type="xb"
        :rules="rules.sex"
      />
      <MDate
        v-model="birthDate"
        label="出生年月"
        name="birthDate"
        placeholder="请输入出生年月"
        :rules="rules.birthDate"
      />
      <div style="margin: 16px">
        <van-button type="primary" round block native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  setup() {
    const rules = {
      userName: [{ required: true, message: '请输入用户名' }],
      sex: [{ required: true, message: '请选择性别' }],
      birthDate: [{ required: true, message: '请输入出生年月' }]
    }

    const state = reactive({
      userName: '1',
      sex: '1',
      birthDate: '2021-05-12'
    })

    const onSubmit = (values: any) => {
      console.log('submit', values)
    }

    return {
      rules,
      ...toRefs(state),
      onSubmit
    }
  }
})
</script>

<style lang="less"></style>
