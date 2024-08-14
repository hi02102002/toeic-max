import { appConfig } from '@/configs/app'

/**
 * Get app title
 * @param title
 * @returns {String}
 * @example Manage Kits | ToiecMeozz
 */
export const getAppTitle = (title: string) => {
    return `${title} | ${appConfig.appName}`
}

/**
 * Get word url audio
 * @param word
 * @param type type of accent 1 for us 2 for uk
 */
export const getWordAudioUrl = (word: string, type: 1 | 2) => {
    return `https://dict.youdao.com/dictvoice?audio=${word}&type=${type}`
}

export const htmlEntityToChar = (htmlEntity: string) => {
    const textarea = document.createElement('textarea')
    textarea.innerHTML = htmlEntity

    return textarea.value
}
