import { config } from 'dotenv'
import type { Config } from 'drizzle-kit'

config({
    path:
        process.env.NODE_ENV === 'production' ? undefined : '.env.development',
})

export default {
    schema: './src/database/schema.ts',
    out: './src/database/migrations',
    dialect: 'postgresql',
    dbCredentials: {
        host: process.env.DB_HOST as string,
        port: Number(process.env.DB_PORT || 5435),
        database: process.env.DB_NAME as string,
        user: process.env.DB_USER as string,
        password: process.env.DB_PASSWORD as string,
    },
} satisfies Config
