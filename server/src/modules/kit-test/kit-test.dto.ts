import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator';
import { BaseQueryDto, IBasePagingQuery } from '@/libs/api';

export class KitTestDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  year: number;

  @IsString()
  @IsNotEmpty()
  kit_id: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  slug: string;
}

export class QueryKitTestDto extends BaseQueryDto {}
