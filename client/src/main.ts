import { VueQueryPlugin } from '@tanstack/vue-query'
import duration from 'dayjs/plugin/duration'
import 'nprogress/nprogress.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { DataLoaderPlugin } from 'vue-router/auto'
import App from './App.vue'
import './assets/custom-nprogress.css'
import './assets/index.css'
import './assets/question-conent.css'
import { queryClient } from './libs/react-query'
import router from './router'

import dayjs from 'dayjs'

dayjs.extend(duration)

const app = createApp(App)

app.use(createPinia())
app.use(VueQueryPlugin, {
    queryClient,
})
app.use(DataLoaderPlugin, {
    router,
})

app.use(router)

app.mount('#app')
