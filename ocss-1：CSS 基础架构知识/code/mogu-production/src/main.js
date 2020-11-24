import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {store} from './store'
import 'lib-flexible/flexible.js'
import 'normalize.css/normalize.css'
import mgjUI from '@/components'
import './style/index.scss';
import 'vant/lib/toast/style';
import '@/mock'; // mock数据

createApp(App).use(mgjUI).use(router).use(store).mount('#app')
