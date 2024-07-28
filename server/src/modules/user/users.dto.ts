import { Match } from '@/utils/decorator'
import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator'
import { validationMetadatasToSchemas } from 'class-validator-jsonschema'

export class CreateUserDto {
    @IsEmail()
    public email!: string

    @IsString()
    @IsNotEmpty()
    @MinLength(9)
    @MaxLength(32)
    public password!: string
}

export class UpdateUserDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(9)
    @MaxLength(32)
    public password!: string
}

export class UpdateInfoUserDto {
    @IsString({
        message: 'Name must be a string.',
    })
    @IsOptional()
    name?: string

    @IsString({
        message: 'Email must be a string.',
    })
    @IsEmail()
    @IsOptional()
    email?: string

    @IsString({
        message: 'Avatar must be a string.',
    })
    @IsOptional()
    avatar?: string
}

export class ChangePasswordDto {
    @IsString({
        message: 'Old password must be a string.',
    })
    @IsNotEmpty({
        message: 'Old password is required.',
    })
    oldPassword: string

    @IsString({
        message: 'Password must be a string.',
    })
    @IsNotEmpty({
        message: 'Password is required.',
    })
    @MinLength(6, {
        message: 'Password is too short.',
    })
    @MaxLength(32, {
        message: 'Password is too long.',
    })
    password: string

    @IsString({
        message: 'Confirm password must be a string.',
    })
    @IsNotEmpty({
        message: 'Confirm password is required.',
    })
    @Match(ChangePasswordDto, (o) => o.password)
    passwordConfirm: string
}

export const userSchemas = validationMetadatasToSchemas()
