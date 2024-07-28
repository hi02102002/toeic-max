import { BaseQueryDto } from '@/libs/api'
import { Transform } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { validationMetadatasToSchemas } from 'class-validator-jsonschema'

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

export const kitSchemas = validationMetadatasToSchemas()
