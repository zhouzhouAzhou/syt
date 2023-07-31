import { createApp } from 'vue'
import App from './App.vue'
//引入清除默认样式
import '@/style/reset.scss'
import HospitalTop from '@/components/hospital_top/index.vue'
import HospitalBottom from '@/components/hospital_bottom/index.vue'
import Login from '@/components/login/index.vue'
import Visitor from '@/components/visitor/visitor.vue'

import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

//引入仓库
import pinia from '@/store'

import './permission'

const app=createApp(App);

app.component('HospitalTop',HospitalTop)
app.component('HospitalBottom',HospitalBottom)
app.component('Login',Login)
app.component('Visitor',Visitor)



app.use(router)
app.use(ElementPlus, {
    locale: zhCn,
  })

//安装仓库
app.use(pinia)
app.mount('#app')
