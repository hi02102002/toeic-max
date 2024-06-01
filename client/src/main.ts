import { VueQueryPlugin } from '@tanstack/vue-query'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { DataLoaderPlugin } from 'vue-router/auto'
import App from './App.vue'
import './assets/index.css'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(VueQueryPlugin)
app.use(DataLoaderPlugin, {
    router,
})

app.use(router)

app.mount('#app')
