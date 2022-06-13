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

  async getKeyForPass(email: string) {
    const user = await this.usersService.getUserByEmail(email)
    if (!user) {
      throw new HttpException('Не знайдено користувача', HttpStatus.NOT_FOUND)
    }

    const passRecovery = await this.passRecoveryRepository.findOne({
      where: { userId: user.id },
    })
    let key: number
    if (!passRecovery) {
      key = Math.floor(Math.random() * 900000) + 100000
      await this.passRecoveryRepository.create({ key, userId: user.id })
    } else {
      key = passRecovery.key
    }

    this.mailerService.sendMail({
      to: user.email,
      from: process.env.MAIL_EMAIL,
      subject: 'Reset password',
      text: '',
      html: /*html*/ `<p>${key}</p>`,
    })

    return 'Ключ надіслано на ' + email
  }

  async resetPassword(dto: ResetPasswordDto) {
    const passRecovery = await this.passRecoveryRepository.findOne({
      where: { key: dto.key },
      include: { all: true },
    })
    if (!passRecovery && !passRecovery?.user) {
      throw new HttpException('Не знайдено користувача', HttpStatus.NOT_FOUND)
    }

    if (dto.newPassword !== dto.repeatNewPassword) {
      throw new HttpException('Паролі не співпадають', HttpStatus.BAD_REQUEST)
    }

    const password = await hash(dto.newPassword, 3)

    passRecovery.user.password = password
    passRecovery.user.save()
    passRecovery.destroy()
    return 'Пароль змінено'
  }
}
