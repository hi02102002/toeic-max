import type { Updater } from '@tanstack/vue-table'
import { AxiosError } from 'axios'
import { clsx, type ClassValue } from 'clsx'
import dayjs from 'dayjs'
import { twMerge } from 'tailwind-merge'
import type { Ref } from 'vue'
import { toast } from 'vue-sonner'

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

/**
 * Converts a string to title case.
 * @param str - The input string to convert.
 * @returns The converted string in title case.
 */
export const toTitleCase = (str: string) => {
    const segments = str.split('_')

    const words = segments.map((segment) =>
        segment
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' '),
    )

    const titleCase = words.join(' ')
    return titleCase
}

export const isValidYear = (year: number) => {
    const _year = year.toString()

    const pattern = /^\d{4}$/
    return pattern.test(_year)
}

export const toastError = (error: any) => {
    if (error instanceof AxiosError) {
        toast.error(error.response?.data.message)
    } else {
        toast.error('Something went wrong.')
    }
}

export const formatMilliseconds = (milliseconds: number) => {
    const dur = dayjs.duration(milliseconds)

    const minutes = dur.minutes()
    const seconds = dur.seconds()

    return `${minutes > 9 ? minutes : '0' + minutes}:${seconds > 9 ? seconds : '0' + seconds}`
}
