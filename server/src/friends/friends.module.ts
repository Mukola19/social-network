import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { TokenModule } from 'src/token/token.module'
import { User } from 'src/users/users.model'
import { FriendsController } from './friends.controller'
import { Friends } from './friends.model'
import { FriendsService } from './friends.service'

@Module({
  controllers: [FriendsController],
  providers: [FriendsService],
  imports: [SequelizeModule.forFeature([User, Friends]), TokenModule],
})
export class FriendsModule {}
