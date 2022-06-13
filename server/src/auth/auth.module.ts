import { MailerModule } from '@nestjs-modules/mailer'
import { Module } from '@nestjs/common'
import { PasswordResetModule } from 'src/password-reset/password-reset.module'
import { TokenModule } from 'src/token/token.module'
import { UsersModule } from 'src/users/users.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    UsersModule,
    TokenModule,
    MailerModule,
    PasswordResetModule
  ],
})
export class AuthModule {}
