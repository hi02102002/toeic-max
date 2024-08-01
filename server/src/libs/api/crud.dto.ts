import { toBoolean } from '@/utils/common'
import { Transform } from 'class-transformer'
import {
    IsArray,
    IsBoolean,
    IsNumber,
    IsOptional,
    IsString,
    Matches,
} from 'class-validator'
import {
    FILTER_PATTERN,
    IBasePagingBuilderQuery,
    IBasePagingQuery,
    ORDER_BY_PATERN,
    WITH_PATERN,
} from './crud.type'

export class BaseQueryPagingBuilderDto implements IBasePagingBuilderQuery {
    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => (value ? parseInt(value, 10) : undefined))
    page?: number
    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => (value ? parseInt(value, 10) : undefined))
    limit?: number

    @IsString()
    @IsOptional()
    @Matches(ORDER_BY_PATERN, {
        message: 'Order by must be in format field|asc or field|desc',
    })
    orderBy?: string

    @IsArray()
    @IsString({
        each: true,
    })
    @IsOptional()
    @Matches(WITH_PATERN, {
        message: 'With must be in format field.subField.subField',
        each: true,
    })
    withs?: string[]

    @IsArray()
    @IsString({
        each: true,
    })
    @IsOptional()
    @Matches(FILTER_PATTERN, {
        message: 'Filter must be in format field|condition|value|type',
        each: true,
    })
    filters?: string[]

    @IsString()
    @IsOptional()
    q?: string
}

export class BaseQueryDto implements IBasePagingQuery {
    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => (value ? parseInt(value, 10) : 1))
    page?: number
    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => (value ? parseInt(value, 10) : 10))
    limit?: number
    @IsString()
    @IsOptional()
    q?: string
    @IsString()
    @IsOptional()
    orderBy?: string

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => (value ? toBoolean(value) : true))
    asc?: boolean
}
