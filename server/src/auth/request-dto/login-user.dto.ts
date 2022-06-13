import { IsEmail, IsString, Length } from 'class-validator'

export class LoginUserDto {
  @IsString({ message: 'Має бути рядком' })
  @IsEmail({}, { message: 'Не коректний email' })
  readonly email: string

  @IsString({ message: 'Має бути рядком' })
  @Length(4, 16, { message: 'Не менше 4 не більше 16' })
  readonly password: string
} 