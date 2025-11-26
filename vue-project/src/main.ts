import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import echarts from '@/plugins/echarts.js'
import App from './App.vue'
import i18n from '@/locales/i18n.js'
import router from './router/index.js'

import './assets/init.css'

// 导入组件库
import ElementPlus from 'element-plus'
import elementIcon from '@/plugins/icon.js'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'

//仓库
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

//配置
const app = createApp(App)
app.use(ElementPlus, {locale: zhCn,})
app.use(pinia)
app.use(router)
app.use(elementIcon)
app.use(echarts)
app.use(i18n)

app.mount('#app')
