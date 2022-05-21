import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { User } from 'src/users/users.model'

interface TokenCreationAttrs {
  userId: number
  refreshToken: string
}

@Table({ tableName: 'tokens' })
export class Token extends Model<Token, TokenCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number

  
  @Column({ type: DataType.STRING, allowNull: false })
  refreshToken: string


  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number

  @BelongsTo(() => User)
  owner: User
  

}
