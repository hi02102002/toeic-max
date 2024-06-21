export const toBoolean = (value: any): boolean => {
    if (value === 'true' || value === '1' || value === 1 || value === true) {
        return true
    }
    return false
}

export const getAvatar = (username: string): string => {
    return `https://ui-avatars.com/api/?background=random&name=${username}`
}

export const getFirstNumberInString = (str: string): number | null => {
    const regex = /-?\d+(\.\d+)?/
    const match = str.match(regex)
    return match ? Number(match[0]) : 0
}
