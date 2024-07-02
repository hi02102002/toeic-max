import { onUnmounted, watchEffect } from 'vue'

export const usePrefetchResource = (url: string | string[]) => {
    const prefetch = async (url: string) => {
        if (!url) return

        const link = document.createElement('link')
        link.rel = 'prefetch'
        link.id = `prefetch-${url}`

        link.href = url

        document.head.appendChild(link)
    }

    const checkNotUrl = (url: string | string[]) => {
        return (
            url === null ||
            url === undefined ||
            (Array.isArray(url) && url.length === 0)
        )
    }

    watchEffect(() => {
        if (checkNotUrl(url)) return

        if (Array.isArray(url)) {
            url.forEach((u) => {
                prefetch(u)
            })
        } else {
            prefetch(url)
        }

        console.log(url)
    })

    onUnmounted(() => {
        if (checkNotUrl(url)) return

        if (Array.isArray(url)) {
            url.forEach((u) => {
                const link = document.getElementById(`prefetch-${u}`)
                link?.remove()
            })
        } else {
            const link = document.getElementById(`prefetch-${url}`)
            link?.remove()
        }
    })
}
