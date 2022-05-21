const { hash, compare } = require('bcryptjs')
const { v4 } = require('uuid')
const { User } = require('../models/models')
const AuthUserDto = require('../dtos/authUserDto')
const ApiError = require('../ApiError/ApiError')
const fileService = require('./fileService')
const tokenService = require('./tokenService')
const mailService = require('./mailService')

class AuthService {
  async register({ email, password, fullName }) {
    const candidate = await User.findOne({ where: { email } })
    // if (candidate) throw ApiError.badRequest('Такий користувач вже існує')
    if (candidate) throw ApiError.badRequest('Такий користувач вже існує')

    //зберігаєм фото в папку, а імя в базу даних
    // const photoName = await fileService.save(photo)

    //генеруєм linkId для підвердження пошти
    const linkId = v4()

    //Хешируєм пароль
    const hashPassword = await hash(password, 4)

    const user = await User.create({
      email,
      password: hashPassword,
      fullName,
      linkId,
    })

    mailService.send(email, linkId)

    const userDto = new AuthUserDto(user)
    const tokens = tokenService.createTokens(user.id, email)
    await tokenService.saveRefreshToten(user.id, tokens.refreshToken)

    return { ...userDto, tokens }
  }

  async login(email, password) {
    const user = await User.findOne({ where: { email } })
    if (!user) return 'Такого користувача не існує'

    const isTrue = compare(password, user.password)
    if (!isTrue) return 'Невірний пароль'

    const userDto = new AuthUserDto(user)

    const tokens = tokenService.createTokens(user.id, email)
    await tokenService.saveRefreshToten(user.id, tokens.refreshToken)

    return { ...userDto, tokens }
  }

  async logout(refreshToken) {
    return await tokenService.destroyToken(refreshToken)
  }

  async activateEmail(linkId) {
    const isActivated = await User.update(
      { isActivated: true },
      { where: { linkId } }
    )
    return isActivated
  }

  async refresh(refreshToken) {
    if (!refreshToken) throw ApiError.unauthorized()
    const userData = tokenService.validateRefreshToken(refreshToken)
    const isToken = await tokenService.findToken(refreshToken)

    if (!userData || !isToken) throw ApiError.unauthorized()

    const user = await User.findOne({ where: { id: userData.id } })
    const userDto = new AuthUserDto(user)
    const tokens = tokenService.createTokens(user.id, user.email)

    await tokenService.saveRefreshToten(user.id, tokens.refreshToken)

    return { tokens, ...userDto }
  }
}

module.exports = new AuthService()
