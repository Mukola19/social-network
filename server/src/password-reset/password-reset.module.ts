import { MailerModule } from '@nestjs-modules/mailer'
import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from 'src/users/users.model'
import { UsersModule } from 'src/users/users.module'
import { PasswordReset } from './password-reset.model'
import { PasswordResetService } from './password-reset.service'

@Module({
  providers: [PasswordResetService],
  exports: [PasswordResetService],
  imports: [
    SequelizeModule.forFeature([PasswordReset, User]),
    UsersModule,
    MailerModule,
  ],
})
export class PasswordResetModule {}
