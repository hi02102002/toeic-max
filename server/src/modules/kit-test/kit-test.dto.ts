import { BaseQueryDto } from '@/libs/api'
import { Transform } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class KitTestDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value))
    year: number

    @IsString()
    @IsNotEmpty()
    kit_id: string

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    slug: string
}

export class QueryKitTestDto extends BaseQueryDto {
    @IsString()
    @IsOptional()
    kit_id?: string
}
