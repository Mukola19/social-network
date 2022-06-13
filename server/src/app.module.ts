import { Module } from '@nestjs/common'
import { UsersModule } from './users/users.module'
import { SequelizeModule } from '@nestjs/sequelize'
import { ConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { AuthModule } from './auth/auth.module'
import { TokenModule } from './token/token.module'
import { User } from './users/users.model'
import { Token } from './token/token.model'
import { ProfileModule } from './profile/profile.module'
import { FriendsModule } from './friends/friends.module'
import { Friends } from './friends/friends.model'
import { FilesModule } from './files/files.module'
import { join } from 'path'
import { PasswordResetModule } from './password-reset/password-reset.module'
import { PasswordReset } from './password-reset/password-reset.model'
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter'
import { MailerModule } from '@nestjs-modules/mailer'

@Module({
  controllers: [],
  providers: [],
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.ukr.net',
        port: 465,
        secure: true,
        auth: {
          user: 'test2819@ukr.net',
          pass: 'ZSZVBH3MszqP9p1s',
        },
      },
      defaults: {
        from: '"nest-test" <test2819@ukr.net>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new EjsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'static'),
    }),
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV || 'development'}.env`,
    }),

    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DB,
      models: [Token, User, Friends, PasswordReset],
      autoLoadModels: true,
    }),
    UsersModule,
    AuthModule,
    TokenModule,
    ProfileModule,
    FriendsModule,
    FilesModule,
    PasswordResetModule,
  ],
})
export class AppModule {}
