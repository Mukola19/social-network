import { MailerService } from '@nestjs-modules/mailer'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { hash } from 'bcryptjs'
import { UsersService } from 'src/users/users.service'
import { PasswordReset } from './password-reset.model'
import { ResetPasswordDto } from './request-dto/reset-password.dto'

@Injectable()
export class PasswordResetService {
  constructor(
    @InjectModel(PasswordReset)
    private passRecoveryRepository: typeof PasswordReset,
    private usersService: UsersService,
    private mailerService: MailerService
  ) {}

  async getSecretKeyForPass(email: string) {
    const user = await this.usersService.getUserByEmail(email)
    if (!user) {
      throw new HttpException('Не знайдено користувача', HttpStatus.NOT_FOUND)
    }
    const secretKey = Math.floor(Math.random() * 900000) + 100000

    await this.passRecoveryRepository.create({ secretKey, userId: user.id })

    this.mailerService.sendMail({
      to: user.email,
      from: process.env.MAIL_EMAIL,
      subject: 'Reset password',
      text: '',
      html: /*html*/ `<p>${secretKey}</p>`,
    })

  }

  async passwordReset(dto: ResetPasswordDto) {
    const user = await this.usersService.getUserByEmail(dto.email)
    if (!user) {
      throw new HttpException('Не знайдено користувача', HttpStatus.NOT_FOUND)
    }

    const passReset = await this.passRecoveryRepository.findOne({ where: { userId: user.id } })
    if (!passReset) { throw new HttpException('Помилка при відновлені пароля', HttpStatus.NOT_FOUND )}
    if (dto.password !== dto.repeatPassword) { throw new HttpException('Паролі не співпадають', HttpStatus.NOT_FOUND) }

    const password = await hash(dto.password, 3)

    user.password = password
    user.save()
    passReset.destroy()

  }
}
