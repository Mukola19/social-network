import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from 'src/users/users.model'
import { Token } from './token.model'
import { TokenService } from './token.service'

@Module({
  providers: [TokenService],
  imports: [SequelizeModule.forFeature([Token, User]), JwtModule.register({})],
  exports: [TokenService],
})
export class TokenModule {}
