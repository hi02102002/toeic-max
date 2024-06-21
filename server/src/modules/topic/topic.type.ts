import { topics } from '@/database/schema'

export type TTopic = typeof topics.$inferSelect
