import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoader = defineStore('loader', () => {
    const loading = ref(true)

    const setLoader = (value: boolean) => {
        loading.value = value
    }

    return {
        loading,
        setLoader,
    }
})
