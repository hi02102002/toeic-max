export const toBoolean = (value: any): boolean => {
    if (value === 'true' || value === '1' || value === 1 || value === true) {
        return true
    }
    return false
}

export const getAvatar = (username: string): string => {
    return `https://ui-avatars.com/api/?background=random&name=${username}`
}
