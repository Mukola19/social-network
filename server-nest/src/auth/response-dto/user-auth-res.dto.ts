import { ApiProperty } from '@nestjs/swagger'
import { User } from 'src/users/users.model'
import { Exclude } from 'class-transformer'

export class UserAuthResDto {
  @ApiProperty({ example: 1, description: 'Id' })
  id: number

  @ApiProperty({ example: 'email@gmail.com', description: 'Email' })
  email: string

  @Exclude()
  @ApiProperty({ example: '0000', description: 'Password' })
  password: string

  @ApiProperty({ example: 'Metr', description: 'FullName' })
  fullName: string

  @ApiProperty({ example: 'http://localhost/80abbc7b-34ae-4a78-b601-0ec96b9c852f.jpg', description: 'Photo' })
  photoUrl: string

  @ApiProperty({ example: '80abbc7b-34ae-4a78-b601-0ec96b9c852f', description: 'Link for active email' })
  @Exclude()
  linkId: string

  @ApiProperty({ example: true, description: 'Is activated email' })
  isActivated: boolean

  @ApiProperty({ example: 'Metr', description: 'Information about my life' })
  aboutMe: string

  @ApiProperty({ example: true, description: 'Do i work' })
  lookingForAJob: boolean

  constructor(partial: Partial<UserAuthResDto>) {
    Object.assign(this, partial)
  }
}
