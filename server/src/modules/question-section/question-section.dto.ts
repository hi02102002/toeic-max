import { BaseQueryDto } from '@/libs/api'
import { Transform, Type } from 'class-transformer'
import {
    IsArray,
    IsNotEmpty,
    IsNumber,
    IsObject,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator'
import { validationMetadatasToSchemas } from 'class-validator-jsonschema'

export class QuestionDto {
    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value))
    p: 1 | 2 | 3 | 4 | 5 | 6 | 7

    @IsObject()
    @IsNotEmpty()
    opts: {
        a: string
        b: string
        c: string
        d: string
    }

    @IsString()
    @IsNotEmpty()
    ans: 'a' | 'b' | 'c' | 'd'

    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value))
    location: number

    @IsObject()
    @IsOptional()
    @Transform(
        ({ value }) =>
            value || {
                tran: {
                    vi: null,
                },
            },
    )
    trans: {
        vi: string
    }

    @IsString()
    @IsNotEmpty()
    q: string
}

export class CreateQuestionDto {
    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value))
    part: 1 | 2 | 3 | 4 | 5 | 6 | 7

    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    @Transform(({ value }) => value || [])
    imageUrls: string[]

    @IsString()
    @IsOptional()
    @Transform(({ value }) => value || '')
    audioUrl?: string

    @IsObject()
    @IsOptional()
    @Transform(
        ({ value }) =>
            value || {
                text: null,
                tran: {
                    vi: null,
                    en: null,
                },
            },
    )
    teaser: {
        text: string
        trans: {
            vi: string
            en: string
        }
    }

    @IsString()
    @IsNotEmpty()
    location: string // location of the question ex: 1, 37-49

    @IsArray()
    @IsNotEmpty()
    @ValidateNested({
        each: true,
    })
    @Type(() => QuestionDto)
    questions: QuestionDto[]

    @IsString()
    @IsNotEmpty()
    testKitId: string
}

export class QueryQuestionSectionDto extends BaseQueryDto {
    @IsString()
    @IsOptional()
    testKitId?: string

    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    part?: 1 | 2 | 3 | 4 | 5 | 6 | 7
}

export const questionSectionSchemas = validationMetadatasToSchemas()
