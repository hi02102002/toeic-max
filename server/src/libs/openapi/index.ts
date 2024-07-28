import { authSchemas } from '@/modules/auth'
import { historySchemas } from '@/modules/history'
import { kitTestSchemas } from '@/modules/kit-test'
import { kitSchemas } from '@/modules/kits'
import { questionSectionDocs } from '@/modules/question-section'
import { sectionSchemas } from '@/modules/section'
import { topicSchemas } from '@/modules/topic'
import { userSchemas } from '@/modules/user'
import { vocabularySchemas } from '@/modules/vocabulary'
import { OpenAPIV3 } from 'openapi-types'

export const openapi: OpenAPIV3.Document = {
    info: {
        title: 'Ninja Toiec API',
        version: '1.0.0',
        description: 'API Document',
        contact: {
            email: 'hoanghuy.dev0210@gmail.com',
            name: 'Hoang Huy',
        },
    },
    openapi: '3.0.1',
    paths: {
        ...questionSectionDocs,
    },
    components: {
        schemas: {
            ...authSchemas,
            ...historySchemas,
            ...kitTestSchemas,
            ...kitSchemas,
            ...sectionSchemas,
            ...topicSchemas,
            ...userSchemas,
            ...vocabularySchemas,
        } as any,
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                description: 'JWT token',
                bearerFormat: 'JWT',
            },
        },
    },
}
