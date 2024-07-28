import { crudPath } from '@/libs/openapi/helper'
import { OpenAPIV3 } from 'openapi-types'
import {
    CreateQuestionDto,
    QueryQuestionSectionDto,
} from './question-section.dto'

export const questionSectionDocs: OpenAPIV3.PathsObject = {
    ...crudPath({
        name: 'QuestionSection',
        dtos: {
            createDto: CreateQuestionDto,
            updateDto: CreateQuestionDto,
            queryDto: QueryQuestionSectionDto,
        },
        path: '/questions',
    }),
    'api/questions/for-test/{testKitId}': {
        get: {
            tags: ['QuestionSection'],
            summary: 'Get question sections for test',
            parameters: [
                {
                    name: 'testKitId',
                    in: 'path',
                    required: true,
                    schema: {
                        type: 'string',
                    },
                },
            ],
            responses: {
                200: {
                    description: 'Get question sections for test',
                },
            },
        },
    },
    'api/questions/for-practice/{part}/{numOfQuestions}': {
        get: {
            tags: ['QuestionSection'],
            summary: 'Get question sections for practice',
            parameters: [
                {
                    name: 'part',
                    in: 'path',
                    required: true,
                    schema: {
                        type: 'number',
                    },
                },
                {
                    name: 'numOfQuestions',
                    in: 'path',
                    required: true,
                    schema: {
                        type: 'number',
                    },
                },
            ],
            responses: {
                200: {
                    description: 'Get question sections for practice',
                },
            },
        },
    },
}
