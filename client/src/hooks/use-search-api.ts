import { useUrlSearchParams } from '@vueuse/core'

export const useSearchApi = () => {
    const params = useUrlSearchParams('history', {
        initialValue: {
            q: '',
        },
    })

    const handleChange = (_q: string) => {
        params.q = _q
    }

    return params.q
}
