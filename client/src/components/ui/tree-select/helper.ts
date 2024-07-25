import type { TOption } from './tree-select.type'

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
