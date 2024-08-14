export const opacityForHex = (hex: string, opacity = 1) => {
    if (!(hex.startsWith('#') && (hex.length === 7 || hex.length === 9))) return

    opacity = Math.max(0, Math.min(opacity, 1))

    if (hex.length === 7) {
        hex += Math.round(opacity * 255)
            .toString(16)
            .padStart(2, '0')
    } else if (hex.length === 9) {
        hex =
            hex.slice(0, 7) +
            Math.round(opacity * 255)
                .toString(16)
                .padStart(2, '0')
    }

    return hex
}

export const opacityForRgb = (rgb: string, opacity = 1) => {
    opacity = Math.max(0, Math.min(opacity, 1))

    const matches = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/)

    if (!matches) return

    const [_, r, g, b] = matches
    return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

export const opacityForHsl = (hsl: string, opacity = 1) => {
    const matches = hsl.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/)

    if (!matches) return

    opacity = Math.max(0, Math.min(opacity, 1))

    const [_, h, s, l] = matches
    return `hsla(${h}, ${s}%, ${l}%, ${opacity})`
}

export const setOpacityForColor = (color: string, opacity = 1) => {
    if (color.startsWith('#')) return opacityForHex(color, opacity)
    if (color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/)) {
        return opacityForRgb(color, opacity)
    }

    if (color.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/))
        return opacityForHsl(color, 1)

    return color
}
