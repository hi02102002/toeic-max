export type TSectionQuestion = {
    id: string
    location: string
    testKitId: string
    createdAt: Date
    updatedAt: Date
    part: 1 | 2 | 3 | 4 | 5 | 6 | 7
    imageUrls: string[]
    audioUrl: string
    teaser: {
        text: string
        tran?: {
            [key: string]: string
        }
        trans?: {
            [key: string]: string
        }
    }
    questions: TQuestion[]
}

export type TQuestion = {
    id: string
    opts: {
        a: string
        b: string
        c: string
        d: string
    }
    ans: 'a' | 'b' | 'c' | 'd'
    trans: {
        [key: string]: string
    }
    p: number
    location: number
    questionSectionId: string
    createdAt: Date
    updatedAt: Date
    q: string
}
