import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCachedStore = defineStore('cached-store', () => {
    const cached = ref<Record<string, any>>({})

    function set(key: string, value: any) {
        cached.value[key] = value
    }

    function get(key: string) {
        return cached.value[key]
    }

    return { set, get, cached }
})
