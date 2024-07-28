import { BaseQueryDto } from '@/libs/api'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { validationMetadatasToSchemas } from 'class-validator-jsonschema'

export class TopicDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsOptional()
    parent_id?: string | null
}

export class QueryTopicDto extends BaseQueryDto {
    @IsString()
    @IsOptional()
    parent_id?: string | null
}

export const topicSchemas = validationMetadatasToSchemas()
