export const toBoolean = (value: any): boolean => {
    if (value === 'true' || value === '1' || value === 1 || value === true) {
        return true
    }
    return false
}
