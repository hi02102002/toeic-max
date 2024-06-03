export type TSectionQuestion = {
    id: string
    location: string
    test_kit_id: string
    created_at: Date
    updated_at: Date
    part: 1 | 2 | 3 | 4 | 5 | 6 | 7
    image_urls: string[]
    audio_url: string
    teaser: {
        text: string
        trans: {
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
    question_section_id: string
    created_at: Date
    updated_at: Date
}
