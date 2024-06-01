import { kits } from '@/database/schema'

/**
 * @openapi
 * components:
 *   schemas:
 *     Kit:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         year:
 *           type: number
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *       required:
 *         - name
 *         - year
 *       example:
 *         id: "12345"
 *         name: "Sample Kit"
 *         year: 2022
 *         created_at: "2022-01-01T00:00:00Z"
 *         updated_at: "2022-06-01T00:00:00Z"
 */
export type TKit = typeof kits.$inferSelect

export type TKitPaginate = TKit & {
    a: string
}
