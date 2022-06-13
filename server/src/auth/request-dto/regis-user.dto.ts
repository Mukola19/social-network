import { IsEmail, IsString, Length } from 'class-validator'
import { ApiProperty} from '@nestjs/swagger'
export class RegisterUserDto {
  @ApiProperty({ example: 'Metr', description: 'FullName' })
  @IsString({ message: 'Має бути рядком' })
  readonly fullName: string

  @ApiProperty({ example: 'email@gmail.com', description: 'Email' })
  @IsString({ message: 'Має бути рядком' })
  @IsEmail({}, { message: 'Не коректний email' })
  readonly email: string

  @ApiProperty({ example: '000000', description: 'Password' })
  @IsString({ message: 'Має бути рядком' })
  @Length(4, 16, { message: 'Не менше 4 не більше 16' })
  readonly password: string
}
