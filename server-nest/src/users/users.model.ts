import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'
import { FriendsDto } from 'src/friends/dto/friends.dto'
import { Friends } from 'src/friends/friends.model'
import { Token } from 'src/token/token.model'
import { PasswordReset } from 'src/password-reset/password-reset.model'

interface UserCreationAttrs {
  fullName: string
  email: string
  password: string
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number

  
  @ApiProperty({ example: 'email@gmail.com', description: 'Email' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string

  @ApiProperty({ example: '0000', description: 'Password' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string

  @ApiProperty({ example: 'Metr', description: 'FullName' })
  @Column({ type: DataType.STRING, allowNull: false })
  fullName: string

  @ApiProperty({ example: '80abbc7b-34ae-4a78-b601-0ec96b9c852f.jpg', description: 'Photo' })
  @Column({ type: DataType.STRING, defaultValue: '' })
  photoName: string

  @ApiProperty({ example: '80abbc7b-34ae-4a78-b601-0ec96b9c852f', description: 'Link for active email' })
  @Column({ type: DataType.STRING, defaultValue: '' })
  linkId: string

  @ApiProperty({ example: true, description: 'Is activated email' })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isActivated: boolean

  @ApiProperty({ example: 'Metr', description: 'Information about my life' })
  @Column({ type: DataType.STRING, defaultValue: '' })
  aboutMe: string

  @ApiProperty({ example: true, description: 'Do i work' })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  lookingForAJob: boolean

  @ApiProperty({ example: 'eyJhbGci.eyJpZF9.N4bHhPX', description: 'Token for authentication' })
  @HasMany(() => Token)
  tokens: Token[]

  @ApiProperty({ example: [], description: 'Follow me' })
  @HasMany(() => Friends, 'followerId')
  follower: FriendsDto[]

  @ApiProperty({ example: [], description: 'I follow' })
  @HasMany(() => Friends, 'followedById')
  followedBy: FriendsDto[]


  @HasMany(() => PasswordReset)
  passwordReset: PasswordReset[]
}
