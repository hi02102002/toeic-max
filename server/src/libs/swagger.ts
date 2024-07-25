import { OpenAPIV3_1 } from 'openapi-types'
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
    apis: [],
}

export const swaggerSpec = swaggerJSDoc(options)

export const openapi: OpenAPIV3_1.Document = {
    openapi: '3.0.1',
    info: {
        title: 'Ninja Toiec API',
        version: '1.0.0',
        description: 'API Documentation',
    },
    paths: {},
}
