import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import './index.css'
import store from '../src/vuex/index'
createApp(App).use(ElementPlus).use(router).use(store).mount("#app");
