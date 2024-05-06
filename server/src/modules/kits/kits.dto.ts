import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator';
import { BaseQueryDto, IBasePagingQuery } from '@/libs/api';

export class KitDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  year: number;
}

export class QueryKitDto extends BaseQueryDto {}
