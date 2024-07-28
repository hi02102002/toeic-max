import { PARTS_NOT_RENDER_QUESTION_TEXT } from '@/constants'

export const formatQuestionLocation = ({
    location,
    index,
    q,
    part,
}: {
    location: string | number
    q?: string
    index?: number
    part: number
}) => {
    let _location = `Question ${location}`

    if (index !== undefined) {
        _location = `Question ${index + 1}.${location}.`
    }

    if (q && !PARTS_NOT_RENDER_QUESTION_TEXT.includes(part)) {
        _location += `${q
            ?.replace(`${location}.`, '')
            .replace(`${location}`, '')
            .replace('Question', '')}`
    }

    return _location
}
