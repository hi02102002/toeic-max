import { authApi } from '@/apis/auth.api'
import { queryClient } from '@/libs/react-query'
import { useCurrentUserStore } from '@/stores/current-user'
import nProgress from 'nprogress'
import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router/auto'

nProgress.configure({ showSpinner: false })

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    extendRoutes: (routes) => setupLayouts(routes),
})

router.beforeEach(async (to) => {
    const user = await queryClient.ensureQueryData({
        queryKey: ['current-user'],
        queryFn: () =>
            authApi
                .getCurrentUser()
                .then((res) => res.data)
                .catch(() => {
                    return null
                }),
    })

    useCurrentUserStore().setCurrentUser(user)

    const meta = to.meta as {
        requiresAuth?: boolean
        roles?: ('ADMIN' | 'USER')[]
        isAuthRoute?: boolean
    }

    // If the route is an auth route and the user is logged in, redirect to the home page.
    if (meta?.isAuthRoute && user) {
        const isAdmin = user.roles.includes('ADMIN')

        return isAdmin ? '/admin' : '/dashboard'
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
        nProgress.start()
    }

    next()
})

router.afterEach(() => {
    nProgress.done()
})

export default router
