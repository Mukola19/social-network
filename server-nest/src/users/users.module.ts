import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { TokenModule } from 'src/token/token.module'
import { UsersController } from './users.controller'
import { User } from './users.model'
import { UsersService } from './users.service'

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [SequelizeModule.forFeature([User]), TokenModule],
  exports: [UsersService],
})
export class UsersModule {}
