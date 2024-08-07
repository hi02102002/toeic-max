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
    section_question_id: string

    @IsString()
    @IsNotEmpty()
    question_id: string

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
    is_correct: boolean
}

export class HistoryDto {
    @IsNotEmpty()
    @IsArray()
    contents: Array<PracticePartDto> | Array<any>

    @IsNotEmpty()
    meta_data: any

    @IsString()
    @IsNotEmpty()
    type: string

    @IsString()
    @IsNotEmpty()
    user_id: string
}

export class QueryHistoryDto extends BaseQueryDto {}

export const historySchemas = validationMetadatasToSchemas()
