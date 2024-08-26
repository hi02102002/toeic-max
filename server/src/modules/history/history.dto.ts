import { BaseQueryDto } from '@/libs/api'
import { toBoolean } from '@/utils/common'
import { Transform } from 'class-transformer'
import {
    IsArray,
    IsBoolean,
    IsNotEmpty,
    IsNumber,
    IsString,
} from 'class-validator'
import { validationMetadatasToSchemas } from 'class-validator-jsonschema'

export class PracticePartDto {
    @IsString()
    @IsNotEmpty()
    sectionQuestionId: string

    @IsString()
    @IsNotEmpty()
    questionId: string

    @IsNumber()
    @Transform(({ value }) => parseInt(value))
    @IsNotEmpty()
    part: number

    @IsString()
    @IsNotEmpty()
    ans: string

    @IsString()
    @IsNotEmpty()
    choose: string

    @IsBoolean()
    @IsNotEmpty()
    @Transform(({ value }) => toBoolean(value))
    isCorrect: boolean
}

export class HistoryDto {
    @IsNotEmpty()
    @IsArray()
    contents: Array<PracticePartDto> | Array<any>

    @IsNotEmpty()
    metadata: any

    @IsString()
    @IsNotEmpty()
    type: string

    @IsString()
    @IsNotEmpty()
    userId: string
}

export class QueryHistoryDto extends BaseQueryDto {}

export const historySchemas = validationMetadatasToSchemas()
