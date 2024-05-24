import { BaseQueryDto } from '@/libs/api/crud-service'
import { Transform } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class KitDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value))
    year: number
}

export class QueryKitDto extends BaseQueryDto {}
