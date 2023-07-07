import {createPinia}from 'pinia'
import  piniaPluginPersist from 'pinia-plugin-persist'
const rootStore =createPinia()
rootStore.use(piniaPluginPersist)
export default rootStore