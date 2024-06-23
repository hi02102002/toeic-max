import { BaseQueryDto } from '@/libs/api/crud-service'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateTopicDto {
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
