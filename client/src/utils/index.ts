import type { Updater } from '@tanstack/vue-table'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { Ref } from 'vue'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function valueUpdater<T extends Updater<unknown>>(
    updaterOrValue: T,
    ref: Ref,
) {
    ref.value =
        typeof updaterOrValue === 'function'
            ? updaterOrValue(ref.value)
            : updaterOrValue
}

export const replaceResource = (url: string, resource: string) => {
    return url.replace('{{resource}}', resource)
}

export const calcPageCount = (total: number, limit: number) => {
    return Math.ceil(total / limit)
}
