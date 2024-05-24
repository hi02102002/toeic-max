import { REDIS_HOST, REDIS_PORT } from '@/config'
import { Redis } from 'ioredis'

export const redis = new Redis({
    host: REDIS_HOST,
    port: Number(REDIS_PORT || 6379),
    maxRetriesPerRequest: null,
})
