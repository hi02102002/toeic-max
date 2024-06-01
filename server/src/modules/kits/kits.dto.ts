import { BaseQueryDto } from '@/libs/api/crud-service'
import { Transform } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

/**
 * @openapi
 * components:
 *    schemas:
 *      KitDto:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *          year:
 *            type: number
 *        required:
 *          - name
 *          - year
 *        example:
 *          name: Kit 1
 *          year: 2021
 */
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
