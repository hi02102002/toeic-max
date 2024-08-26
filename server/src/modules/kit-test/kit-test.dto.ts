import { BaseQueryDto } from '@/libs/api'
import { Transform } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import { validationMetadatasToSchemas } from 'class-validator-jsonschema'

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
    kitId: string

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    slug: string
}

export class QueryKitTestDto extends BaseQueryDto {
    @IsString()
    @IsOptional()
    kitId?: string
}

export const kitTestSchemas = validationMetadatasToSchemas()
