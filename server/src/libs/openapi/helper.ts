import { pick } from 'lodash'
import { OpenAPIV3_1 } from 'openapi-types'

export const crudPath = ({
    dtos,
    name,
    path,
}: {
    path: string
    name: string
    dtos: {
        createDto: any
        updateDto: any
        queryDto: any
    }
}): OpenAPIV3_1.PathsObject => {
    // @ts-ignore
    return {
        [`/api${path}/get-all`]: {
            get: {
                tags: [name],
                summary: `Get all ${name}`,
                responses: pick(getResponse(['array']), ['200', '400', '500']),
                description: `Get all ${name}`,
            },
        },
        [`/api${path}/get-one/{id}`]: {
            get: {
                tags: [name],
                summary: `Get one by id`,
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string',
                        },
                    },
                ],
                responses: pick(getResponse(['object']), [
                    '200',
                    '400',
                    '404',
                    '500',
                ]),
                description: `Get one by id`,
            },
        },
        [`/api${path}`]: {
            post: {
                tags: [name],
                summary: `Create ${name}`,
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                $ref: `#/components/schemas/${dtos.createDto.name}`,
                            },
                        },
                    },
                },
                responses: pick(getResponse(['object']), [
                    '200',
                    '400',
                    '500',
                    '409',
                    '401',
                ]),
            },
            get: {
                tags: [name],
                summary: `Get paging ${name}`,
                responses: pick(getResponse(['object']), ['200', '400', '500']),
                parameters: [
                    {
                        $ref: `#/components/parameters/${dtos.queryDto.name}`,
                        in: 'query',
                    },
                ],
            },
        },
        [`/api${path}/{id}`]: {
            put: {
                tags: [name],
                summary: `Update ${name} by id`,
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string',
                        },
                    },
                ],
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                $ref: `#/components/schemas/${dtos.updateDto.name}`,
                            },
                        },
                    },
                },
                responses: pick(getResponse(['object']), [
                    '200',
                    '400',
                    '404',
                    '500',
                    '401',
                    '403',
                ]),
            },
        },
        [`/api${path}/{id}`]: {
            delete: {
                tags: [name],
                summary: `Delete ${name} by id`,
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string',
                        },
                    },
                ],
                responses: pick(getResponse(['object']), [
                    '200',
                    '400',
                    '404',
                    '500',
                    '401',
                    '403',
                ]),
            },
        },
        [`/api${path}/get-paging-builder`]: {
            get: {
                tags: [name],
                summary: `Get paging builder ${name}`,
                responses: pick(getResponse(['object']), ['200', '400', '500']),
                description: `Get paging builder ${name}`,
                parameters: [
                    {
                        in: 'query',
                        name: 'page',
                        schema: {
                            type: 'number',
                            default: 1,
                        },
                    },
                    {
                        in: 'query',
                        name: 'limit',
                        schema: {
                            type: 'number',
                            default: 10,
                        },
                    },
                    {
                        in: 'query',
                        name: 'orderBy',
                        schema: {
                            type: 'string',
                            example: 'name|asc',
                        },
                    },
                    {
                        in: 'query',
                        name: 'filters',
                        schema: {
                            type: 'array',
                            items: {
                                type: 'string',
                                example: 'name|like|abc',
                            },
                            default: [],
                        },
                        description: 'Filter data',
                    },
                    {
                        in: 'query',
                        name: 'withs',
                        schema: {
                            type: 'array',
                            items: {
                                type: 'string',
                                example: 'children',
                            },
                            default: [],
                        },
                        description: 'Get relationship data',
                    },
                    {
                        in: 'query',
                        name: 'q',
                        schema: {
                            type: 'string',
                        },
                    },
                    {
                        in: 'query',
                        name: 'searchFields',
                        schema: {
                            type: 'array',
                            items: {
                                type: 'string',
                                example: 'name',
                            },
                            default: [],
                        },
                        description: 'Fields will be searched',
                    },
                ],
            },
        },
        [`/api${path}/for-select`]: {
            get: {
                tags: [name],
                summary: `Get all ${name} for select`,
                responses: pick(getResponse(['array']), ['200', '500']),
                description: `Get all ${name} for select`,
            },
        },
    }
}

export const getResponse = (
    typeData: ('array' | OpenAPIV3_1.NonArraySchemaObjectType)[],
): OpenAPIV3_1.ResponsesObject => {
    return {
        '200': {
            description: 'OK',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                            },
                            data: {
                                type: typeData,
                            },
                        },
                    },
                },
            },
        },
        '400': {
            description: 'Bad Request',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                            },
                        },
                    },
                },
            },
        },
        '404': {
            description: 'Not Found',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                            },
                        },
                    },
                },
            },
        },
        '500': {
            description: 'Internal Server Error',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                            },
                        },
                    },
                },
            },
        },
        '401': {
            description: 'Unauthorized',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                            },
                        },
                    },
                },
            },
        },
        '403': {
            description: 'Forbidden',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                            },
                        },
                    },
                },
            },
        },
        '201': {
            description: 'Created',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                            },
                            data: {
                                type: typeData,
                            },
                        },
                    },
                },
            },
        },
        '409': {
            description: 'Conflict',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                            },
                        },
                    },
                },
            },
        },
    }
}
