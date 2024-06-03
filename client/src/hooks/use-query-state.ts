/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NOT_CHOOSE } from '@/constants'
import { useUrlSearchParams } from '@vueuse/core'
import { isEmpty } from 'lodash'
import { reactive, watch } from 'vue'

export const useQueryState = <T extends Record<string, any>>(
    initialState?: T,
) => {
    const state = reactive<T>(initialState || ({} as T))

    const params = useUrlSearchParams<Record<string, any>>('history')

    const handleChange = (key: keyof T, value: any) => {
        if (value === NOT_CHOOSE) {
            // @ts-ignore
            state[key] = undefined
        } else {
            // @ts-ignore
            state[key] = value
        }
    }

    watch(state, (newState) => {
        for (const [key, value] of Object.entries(newState)) {
            if (isEmpty(value)) {
                params[key] = undefined
            } else {
                params[key] = value
            }
        }
    })

    watch(
        params,
        (newParams) => {
            for (const [key, value] of Object.entries(newParams)) {
                state[key] = value
            }
        },
        { immediate: true, deep: true },
    )

    return { state, handleChange }
}
