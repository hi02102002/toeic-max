import type { TOption } from '@/components/ui/tree-select'
import type { Updater } from '@tanstack/vue-table'
import { AxiosError } from 'axios'
import { clsx, type ClassValue } from 'clsx'
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

export const flattenTree = (tree: TOption[]): Array<TOption> => {
    const result: Array<TOption> = []

    const traverse = (node: TOption) => {
        result.push(node)

        if (node.children && node.children.length > 0) {
            node.children.forEach(traverse)
        }
    }

    tree.forEach(traverse)

    return result
}

export const isLowestChild = (tree: TOption[], nodeId: string): boolean => {
    const helper = (_n: TOption) => {
        if (_n.id === nodeId && (!_n.children || _n.children.length === 0)) {
            return true
        }

        if (_n.children) {
            for (const child of _n.children) {
                if (helper(child)) {
                    return true
                }
            }
        }

        return false
    }

    for (const node of tree) {
        if (helper(node)) {
            return true
        }
    }
    return false
}

export const getPath = (tree: TOption[], nodeId: string): string[] => {
    const path: string[] = []

    const helper = (_n: TOption) => {
        if (_n.id === nodeId) {
            path.push(_n.label)
            return
        }

        path.push(_n.label)

        if (_n.children) {
            for (const child of _n.children) {
                helper(child)
            }
        }
    }

    for (const node of tree) {
        helper(node)
    }

    return path
}

export function findIdPath(
    options: TOption[],
    targetId: string,
): string | null {
    for (const option of options) {
        if (option.id === targetId) {
            return option.label
        }

        if (option.children) {
            const path = findIdPath(option.children, targetId)

            if (path) {
                return `${option.label} - ${path}`
            }
        }
    }

    return null
}
