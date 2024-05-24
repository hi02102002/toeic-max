import { kits } from '@/database/schema'

export type TKit = typeof kits.$inferSelect

export type TKitPaginate = TKit & {
    a: string
}
