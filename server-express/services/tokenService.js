const { sign, verify } = require('jsonwebtoken')
const { Token } = require('../models/models')

class TokenService {
  createTokens(id, email) {
    const accessToken = sign({ id, email }, process.env.JWT_SECRET_ACCESS, {
      expiresIn: '30d',
    })
    const refreshToken = sign({ id, email }, process.env.JWT_SECRET_REFRESH, {
      expiresIn: '30d',
    })

    return {
      accessToken,
      refreshToken,
    }
  }
  async saveRefreshToten(userId, refreshToken) {
    const tokenData = await Token.findOne({ where: { userId } })

    if (tokenData) {
      return await Token.update({ refreshToken }, { where: { userId } })
    }

    const token = Token.create({ userId, refreshToken })
    return token
  }

  async destroyToken(refreshToken) {
    const tokenData = await Token.destroy({
      where: { refreshToken },
      force: true,
    })

    return tokenData
  }

  validateAccessToken(token) {
    try {
      const decoded = verify(token, process.env.JWT_SECRET_ACCESS)
      return decoded
    } catch (e) {
      return null
    }
  }

  validateRefreshToken(token) {
    try {
      const decoded = verify(token, process.env.JWT_SECRET_REFRESH)
      return decoded
    } catch (e) {
      return null
    }
  }

  async findToken(refreshToken) {
    const tokenData = await Token.findOne({ where: { refreshToken } })
    return tokenData
  }
}

module.exports = new TokenService()
