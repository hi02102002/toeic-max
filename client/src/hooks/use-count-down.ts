import { ref } from 'vue'

type TOpts = {
    initialTime?: number
    interval?: number
    stopTime?: number
    onStart?: () => void
}

export const useCountDown = (opts?: TOpts) => {
    const {
        initialTime = 60,
        stopTime = 0,
        interval = 1000,
        onStart,
    } = opts || {
        interval: 1000,
        initialTime: 60,
        stopTime: 0,
    }

    const time = ref(initialTime || 60)
    const timer = ref<any>(null)

    const start = () => {
        timer.value = setInterval(() => {
            time.value -= interval / 1000
            if (time.value <= stopTime) {
                clearInterval(timer.value)
            }
        }, interval)

        onStart?.()
    }

    const stop = () => {
        clearInterval(timer.value)
    }

    const reset = () => {
        time.value = initialTime
    }

    const format = (time: number) => {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${
            minutes < 10 ? `0${minutes}` : minutes
        }:${seconds < 10 ? `0${seconds}` : seconds}`
    }

    return { time, start, stop, reset, format }
}
