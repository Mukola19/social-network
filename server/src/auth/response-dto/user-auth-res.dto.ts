import { ApiProperty } from '@nestjs/swagger'
import { User } from 'src/users/users.model'

export class UserAuthResDto {
  @ApiProperty({ example: 1, description: 'Id' })
  id: number

  @ApiProperty({ example: 'email@gmail.com', description: 'Email' })
  email: string

  @ApiProperty({ example: 'Metr', description: 'FullName' })
  fullName: string

  @ApiProperty({
    example: 'http://localhost/80abbc7b-34ae-4a78-b601-0ec96b9c852f.jpg',
    description: 'Photo',
  })
  photoUrl: string

  @ApiProperty({ example: true, description: 'Is activated email' })
  isActivated: boolean

  @ApiProperty({ example: 'utd.mii.ii', description: 'Token' })
  accessToken: string

  constructor(partial: Partial<{ accessToken: string } & User>) {
    this.id = partial.id
    this.email = partial.email
    this.fullName = partial.fullName
    this.photoUrl = process.env.SERVER_URL + '/' + partial.photoName
    this.email = partial.email
    this.isActivated = partial.isActivated
    this.accessToken = partial.accessToken
  }
}
