import type { TUser } from '@/types/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCurrentUserStore = defineStore('current-user', () => {
    const currentUser = ref<TUser | null>(null)

    function setCurrentUser(user: TUser | null) {
        currentUser.value = user
    }

    return { currentUser, setCurrentUser }
})
