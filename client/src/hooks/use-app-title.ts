import { getAppTitle } from '@/utils/common'
import { useTitle } from '@vueuse/core'

export const useAppTitle = (title: string) => {
    useTitle(getAppTitle(title))
}
