import { BaseQueryDto } from '@/libs/api/crud-service'
import { IsOptional, IsString } from 'class-validator'

export class CreateTopicDto {}

export class QueryTopicDto extends BaseQueryDto {
    @IsString()
    @IsOptional()
    parent_id?: string | null
}
