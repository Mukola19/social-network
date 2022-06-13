import { IsEmail, IsString, Length } from 'class-validator'

export class ResetPasswordKeyDto {
  @IsString({ message: 'Має бути рядком' })
  @IsEmail({},{ message: 'Має бути email' })
  readonly email: string

}
