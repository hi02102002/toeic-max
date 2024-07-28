import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator'
import { validationMetadatasToSchemas } from 'class-validator-jsonschema'

export class LoginDto {
    @IsEmail(
        {},
        {
            message: 'Invalid email address.',
        },
    )
    @IsNotEmpty({
        message: 'Email is required.',
    })
    @IsString({
        message: 'Email must be a string.',
    })
    email: string

    @IsString({
        message: 'Password must be a string.',
    })
    @IsNotEmpty({
        message: 'Password is required.',
    })
    password: string
}

export class RegisterDto extends LoginDto {
    @IsString({
        message: 'Password must be a string.',
    })
    @IsNotEmpty({
        message: 'Confirm password is required.',
    })
    passwordConfirm: string

    @IsString({
        message: 'Name must be a string.',
    })
    @IsNotEmpty({
        message: 'Name is required.',
    })
    name: string
}

export class ForgotPasswordDto {
    @IsEmail(
        {},
        {
            message: 'Invalid email address.',
        },
    )
    @IsNotEmpty({
        message: 'Email is required.',
    })
    @IsString({
        message: 'Email must be a string.',
    })
    email: string
}

export class ResetPasswordDto {
    @IsString({
        message: 'Password must be a string.',
    })
    @MinLength(6, {
        message: 'Password is too short.',
    })
    @MaxLength(32, {
        message: 'Password is too long.',
    })
    @IsNotEmpty({
        message: 'Password is required.',
    })
    password: string

    @IsString({
        message: 'Token must be a string.',
    })
    @IsNotEmpty({
        message: 'Confirm password is required.',
    })
    passwordConfirm: string

    @IsString({
        message: 'Token must be a string.',
    })
    @IsOptional()
    token: string
}

export class IdTokenDto {
    @IsString({
        message: 'Id token must be a string.',
    })
    @IsNotEmpty({
        message: 'Id token is required.',
    })
    idToken: string
}

export class RequestVerifyAccountDto {
    @IsEmail(
        {},
        {
            message: 'Invalid email address.',
        },
    )
    @IsNotEmpty({
        message: 'Email is required.',
    })
    @IsString({
        message: 'Email must be a string.',
    })
    email: string
}

export const authSchemas = validationMetadatasToSchemas()
