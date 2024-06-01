import swaggerJSDoc from 'swagger-jsdoc'
import { version } from '../../package.json'

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API',
            version,
            description: 'API Documentation',
            contact: {
                email: 'hoanghuy.dev0210@gmail.com',
                name: 'Hoang Huy',
            },
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: [
        './src/modules/**/*.route.ts',
        './src/modules/**/*.dto.ts',
        './src/modules/**/*.type.ts',
        './src/exceptions/*.ts',
    ],
}

export const swaggerSpec = swaggerJSDoc(options)
