export const formatQuestionLocation = (
    location: string | number,
    q?: string,
    index?: number,
) => {
    let _location = `Question ${location}.`

    if (index !== undefined) {
        _location = `Question ${index + 1}.${location}.`
    }

    if (q) {
        _location += `${q
            ?.replace(`${location}.`, '')
            .replace(`${location}`, '')
            .replace('Question', '')}`
    }

    return _location
}
