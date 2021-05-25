import { createApp } from 'vue'
import importUiFramework from '@/utils/import-ui-framework'
// import echarts from 'echarts'
import store from './store'
import { setupRouter } from './router'
// 引入echarts
import App from './App.vue'
import '@/style/common.less'
import MSelect from './components/Form/Select'
import MDate from './components/Form/Date'
import BlankLayout from './layouts/BlankLayout.vue'

const app = createApp(App)
// app.prototype.$echarts = echarts

setupRouter(app)
app.component('BlankLayout', BlankLayout)
app.component('MSelect', MSelect)
app.component('MDate', MDate)

importUiFramework(app)

app.use(store)
app.mount('#app')
