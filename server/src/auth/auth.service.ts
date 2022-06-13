import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { compare, hash } from 'bcryptjs'
import { v4 } from 'uuid'
import { UsersService } from 'src/users/users.service'
import { TokenService } from 'src/token/token.service'
import { LoginUserDto } from './request-dto/login-user.dto'
import { RegisterUserDto } from './request-dto/regis-user.dto'
import { MailerService } from '@nestjs-modules/mailer'
import { ChangePasswordDto } from './request-dto/change-password.dto'
import { TokenDto } from 'src/token/dto/token.dto'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private tokenService: TokenService,
    private mailerService: MailerService
  ) {}

  async registration(dto: RegisterUserDto) {
    const candidate = await this.usersService.getUserByEmail(dto.email)

    if (candidate) {
      throw new HttpException(
        'Користувача з таким email  існує',
        HttpStatus.BAD_REQUEST
      )
    }
    const hashPassword = await hash(dto.password, 3)
    const linkId = v4()
    const linkIdUrl = process.env.SERVER_URL+ '/api/auth/activateEmail/' + linkId

    this.mailerService.sendMail({
      to: dto.email,
      from: process.env.MAIL_EMAIL,
      subject: 'Activate email',
      text: '',
      html: /*html*/ `<a href="${linkIdUrl}">${linkIdUrl}</a>`,
    })

    let user = await this.usersService.createUser({
      ...dto,
      password: hashPassword,
      linkId,
    })

    const { refreshToken, accessToken } =
      await this.tokenService.generateTokens(user)
    await this.tokenService.saveRefreshToken(refreshToken, user.id)

    const userRes = Object.assign({ accessToken }, user)
    console.log({ user: userRes, refreshToken });
    

    return { user: userRes, refreshToken }
  }

  async login(dto: LoginUserDto) {
    let user = await this.usersService.getUserByEmail(dto.email)
    if (!user) {
      throw new HttpException(
        'З таким email користувача не існує',
        HttpStatus.NOT_FOUND
      )
    }
    const password = await compare(dto.password, user.password)
    if (!password) {
      throw new HttpException(
        'З таким password користувача не існує',
        HttpStatus.BAD_REQUEST
      )
    }

    const { refreshToken, accessToken } =
      await this.tokenService.generateTokens(user)
    await this.tokenService.saveRefreshToken(refreshToken, user.id)
    user = user.get({ plain: true })

    const userRes = Object.assign({ accessToken }, user)

    return { user: userRes, refreshToken }
  }

  async logout(id: number) {
    const dataToken = await this.tokenService.removeRefreshToken(id)
    return dataToken
  }

  async refresh(refreshToken: string) {
    const decoded = this.tokenService.validateRefreshToken(refreshToken)
    const isToken = await this.tokenService.findRefreshToken(refreshToken)

    if (!decoded || !isToken) {
      throw new HttpException(
        'Токен доступа не дійсний',
        HttpStatus.UNAUTHORIZED
      )
    }

    let user = await this.usersService.getUserByEmail(decoded.email)
    const tokens = await this.tokenService.generateTokens(user)

    await this.tokenService.saveRefreshToken(tokens.refreshToken, user.id)
    user = user.get({ plain: true })

    const userRes = Object.assign({ accessToken: tokens.accessToken }, user)

    return { user: userRes, refreshToken: tokens.refreshToken }
  }

  async activateEmail(linkId: string) {
    const user = await this.usersService.getUserByLinkId(linkId)

    if (!user) {
      throw new HttpException(
        'Не вдалось підтвердити електрону пошту',
        HttpStatus.BAD_REQUEST
      )
    }
    user.isActivated = true
    await user.save()
  }

  async changePassword(userBos: TokenDto, dto: ChangePasswordDto) {
    const user = await this.usersService.getUserByEmail(userBos.email)
    if (!user) {
      throw new HttpException(
        'Не вдалось змінити пароль',
        HttpStatus.BAD_REQUEST
      )
    }

    const isPassword = await compare(dto.oldPassword, user.password)

    if (!isPassword) {
      throw new HttpException(
        'Пароль доступа не вірний',
        HttpStatus.BAD_REQUEST
      )
    }
    if (dto.newPassword !== dto.repeatNewPassword) {
      throw new HttpException('Паролі не співпадають', HttpStatus.BAD_REQUEST)
    }

    const password = await hash(dto.newPassword, 3)

    user.password = password
    user.save()
    return 'Пароль змінено'
  }
}
