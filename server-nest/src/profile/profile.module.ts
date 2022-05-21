import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { FilesModule } from 'src/files/files.module'
import { FilesService } from 'src/files/files.service'
import { TokenModule } from 'src/token/token.module'
import { User } from 'src/users/users.model'
import { UsersModule } from 'src/users/users.module'
import { ProfileController } from './profile.controller'
import { ProfileService } from './profile.service'

@Module({
  controllers: [ProfileController],
  providers: [ProfileService],
  imports: [SequelizeModule.forFeature([User]),UsersModule, TokenModule,  FilesModule],
})
export class ProfileModule {}
