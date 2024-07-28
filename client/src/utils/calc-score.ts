import { LISTENING_PARTS, MAX_SCORE, READING_PARTS } from '@/constants'
import type { TChoice } from '@/types/common'

const calcReadingScore = (numberOfCorrectAnswers: number) => {
    const map: Record<number, number> = {
        0: 5,
        1: 5,
        2: 5,
    }

    let sum = 5
    for (let i = 3; i <= 100; i++) {
        sum += 5
        map[i] = sum
    }

    return map[numberOfCorrectAnswers]
}

const calcListeningScore = (numberOfCorrectAnswers: number) => {
    const map: Record<number, number> = {
        96: MAX_SCORE,
        97: MAX_SCORE,
        98: MAX_SCORE,
        99: MAX_SCORE,
    }

    let sum = 0
    for (let i = 0; i <= 95; i++) {
        sum += 5
        map[i] = sum
    }

    return map[numberOfCorrectAnswers]
}

export const calcScore = (choices: TChoice[]) => {
    const readingCorrectChoices = choices.filter(
        (choice) => READING_PARTS.includes(choice.part) && choice.is_correct,
    )

    const listeningCorrectChoices = choices.filter(
        (choice) => LISTENING_PARTS.includes(choice.part) && choice.is_correct,
    )

    const readingScore = calcReadingScore(readingCorrectChoices.length)

    const listeningScore = calcListeningScore(listeningCorrectChoices.length)

    return {
        readingScore,
        listeningScore,
        totalScore: readingScore + listeningScore,
    }
}
