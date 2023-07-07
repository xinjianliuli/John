import { createApp } from 'vue'
import Element from 'element-plus'
import 'normalize.css'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import store from './store'

createApp(App)
.use(router)
.use(Element)
.use(store)
.mount('#app')
