import type { TKit } from './kit'

export type TTest = {
    id: string
    name: string
    year: number
    slug: string
    kit_id: string
    type: string
    kit: TKit
}
