import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.config.errorHandler = (error, vm, info) => {
    console.info('errorHandler----', error, vm, info)
}

app.use(router).mount('#app')
