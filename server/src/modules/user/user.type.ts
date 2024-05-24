import { users } from '@/database/schema'

export type TUser = typeof users.$inferSelect
export type TNewUser = typeof users.$inferInsert
