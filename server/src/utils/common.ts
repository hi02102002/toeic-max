export const toBoolean = (value: any): boolean => {
    if (value === 'true' || value === '1' || value === 1 || value === true) {
        return true
    }
    return false
}

/**
 * Get the avatar for a user
 * @param username The username to get the avatar for
 * @returns The avatar URL
 */
export const getAvatar = (username: string): string => {
    return `https://ui-avatars.com/api/?background=random&name=${username}`
}

/**
 * Get the first number in a string
 * @param str The string to get the number from
 * @returns The first number in the string
 * @example
 * getFirstNumberInString('abc123') // 123
 */
export const getFirstNumberInString = (str: string): number | null => {
    const regex = /-?\d+(\.\d+)?/
    const match = str.match(regex)
    return match ? Number(match[0]) : 0
}

/**
 * Nest an object within another object
 * @param parentKey the key of the parent object
 * @param data the object to nest
 * @returns object with nested object
 */
export const nestObjects = (parentKey: string, data: Record<string, any>) => {
    const parent = data[parentKey]

    if (!parent) {
        return data
    }

    const keys = Object.keys(data)

    const nested = keys.reduce((acc, key) => {
        if (key === parentKey) {
            return {
                ...parent,
            }
        }

        if (!acc[key] && key !== parentKey) {
            acc[key] = data[key]
        }

        return acc
    }, {})

    return nested
}
