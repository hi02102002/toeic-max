import { VueQueryPlugin } from '@tanstack/vue-query'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { DataLoaderPlugin } from 'vue-router/auto'
import App from './App.vue'
import { authApi } from './apis/auth.api'
import './assets/index.css'
import { queryClient } from './libs/react-query'
import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import './assets/custom-nprogress.css'

NProgress.configure({ showSpinner: false })

const app = createApp(App)

router.beforeEach(async (to) => {
    const user = await authApi
        .getCurrentUser()
        .then((res) => res.data)
        .catch(() => {
            return null
        })

    const meta = to.meta as {
        requiresAuth?: boolean
        roles?: ('ADMIN' | 'USER')[]
        isAuthRoute?: boolean
    }

    // If the route is an auth route and the user is logged in, redirect to the home page.
    if (meta?.isAuthRoute && user) {
        return '/'
    }

    // If the route requires authentication and the user is not logged in, redirect to the login page.
    if (meta?.requiresAuth && !user) {
        return `/login?redirect=${encodeURIComponent(to.fullPath)}`
    }

    // If the route requires a specific role and the user does not have that role, redirect to the 403 page.
    if (meta?.roles && user) {
        const hasRole = meta.roles.some((role) => user.roles.includes(role))

        if (!hasRole) {
            return '/403'
        }
    }

    return true
})

router.beforeResolve((to, _from, next) => {
    if (to.path) {
        NProgress.start()
    }

    next()
})

router.afterEach(() => {
    NProgress.done()
})

app.use(createPinia())
app.use(VueQueryPlugin, {
    queryClient,
})
app.use(DataLoaderPlugin, {
    router,
})

app.use(router)

app.mount('#app')
