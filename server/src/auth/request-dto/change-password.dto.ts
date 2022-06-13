import { IsString, Length } from 'class-validator'

export class ChangePasswordDto {
  @IsString({ message: 'Має бути рядком' })
  @Length(4, 16, { message: 'Не менше 4 не більше 16' })
  readonly oldPassword: string

  @IsString({ message: 'Має бути рядком' })
  @Length(4, 16, { message: 'Не менше 4 не більше 16' })
  readonly newPassword: string

  @IsString({ message: 'Має бути рядком' })
  @Length(4, 16, { message: 'Не менше 4 не більше 16' })
  readonly repeatNewPassword: string
}
