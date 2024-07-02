import { BaseQueryDto } from '@/libs/api/crud-service'
import { Transform } from 'class-transformer'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class SectionDto {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    title_vi: string

    @IsString()
    @IsNotEmpty()
    intro: string

    @IsString()
    @IsNotEmpty()
    intro_vi: string

    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsOptional()
    @Transform(({ value }) => value || '')
    intro_url?: string

    @IsString()
    @IsOptional()
    @Transform(({ value }) => value || '')
    intro_image?: string

    @IsString()
    @IsOptional()
    intro_answer?: string

    @IsString()
    @IsOptional()
    section_title?: string

    @IsString()
    @IsOptional()
    section_description?: string
}

export class QuerySectionDto extends BaseQueryDto {}
