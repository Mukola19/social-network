import { IsString, IsEmail, IsBoolean } from 'class-validator'

export class ProfileDto {
  @IsString({ message: 'Має бути рядком' })
  readonly fullName: string

  @IsEmail({}, { message: 'Не коректний email' })
  @IsString({ message: 'Має бути рядком' })
  readonly email: string

  @IsString({ message: 'Має бути рядком' })
  readonly aboutMe: string

  @IsBoolean({ message: 'Має бути логічним' })
  readonly lookingForAJob: boolean
}
