import { BaseQueryDto } from '@/libs/api/crud-service'
import { IsOptional, IsString } from 'class-validator'

export class CreateVocabularyDto {}

export class QueryVocabularyDto extends BaseQueryDto {
    @IsString()
    @IsOptional()
    topic_id?: string
}
