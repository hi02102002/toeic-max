import { BaseQueryDto } from '@/libs/api'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { validationMetadatasToSchemas } from 'class-validator-jsonschema'

export class VocabularyDto {
    @IsString()
    @IsNotEmpty()
    topic_id: string

    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    type: string

    @IsString()
    @IsNotEmpty()
    spelling: string

    @IsString()
    @IsNotEmpty()
    meaning: string

    @IsString()
    @IsNotEmpty()
    category: string

    @IsString()
    @IsOptional()
    example?: string

    @IsString()
    @IsNotEmpty()
    image: string
}

export class QueryVocabularyDto extends BaseQueryDto {
    @IsString()
    @IsOptional()
    topic_id?: string
}

export const vocabularySchemas = validationMetadatasToSchemas()
