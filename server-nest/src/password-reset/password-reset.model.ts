import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'
import { User } from 'src/users/users.model'

interface PasswordResetCreationAttrs {
  secretKey: number
  userId: number
}

@Table({ tableName: 'password_resets' })
export class PasswordReset extends Model<
  PasswordReset,
  PasswordResetCreationAttrs
> {
  @ApiProperty({ example: 1, description: 'Id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number

  // @ApiProperty({ example: 000000, description: 'Serc' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  secretKey: number

  @ApiProperty({ example: 1, description: 'Id user' })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number

  @BelongsTo(() => User)
  owner: User
}
