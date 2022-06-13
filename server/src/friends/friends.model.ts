import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript'
import { Token } from 'src/token/token.model'
import { User } from 'src/users/users.model'

interface FriendsCreationAttrs {
  followerId: number // слідувач
  followedById: number // слідуваний
}

@Table({ tableName: 'friends' })
export class Friends extends Model<Friends, FriendsCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number

  @Column({ type: DataType.INTEGER, allowNull: false })
  followerId: number

  @Column({ type: DataType.INTEGER, allowNull: false })
  followedById: number

  @BelongsTo(() => User, 'followerId')
  follower: any

  @BelongsTo(() => User, 'followedById')
  followedBy: any
}
