import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/sequelize'
import { TokenDto } from './dto/token.dto'
import { Token } from './token.model'

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token) private tokensRepository: typeof Token,
    private jwtService: JwtService
  ) {}

  async generateTokens(user: any) {
    const paylod = { id: user.id, email: user.email }

    const accessToken = this.jwtService.sign(paylod, {
      secret: process.env.SECRET_ACCESS_KEY || 'ACCESS_SECRET',
      expiresIn: '30h',
    })

    const refreshToken = this.jwtService.sign(paylod, {
      secret: process.env.SECRET_REFRESH_KEY || 'REFRESH_SECRET',
      expiresIn: '30d',
    })

    return { refreshToken, accessToken }
  }

  async saveRefreshToken(refreshToken: string, userId: number): Promise<any> {
    await this.tokensRepository.destroy({ where: { userId }, force: true })

    const token = await this.tokensRepository.create({ refreshToken, userId })
    return token
  }
  async removeRefreshToken(userId: number): Promise<any> {
    const dataToken = await this.tokensRepository.destroy({
      where: { userId },
      force: true,
    })
    return !!dataToken
  }

  validateRefreshToken(refreshToken: string): TokenDto {
    try {
      const decoded = this.jwtService.verify(refreshToken, {
        secret: process.env.SECRET_REFRESH_KEY || 'REFRESH_SECRET',
      })

      return decoded
    } catch (e) {
      return null
    }
  }
  validateAccessToken(accessToken: string): TokenDto {
    try {
      const decoded = this.jwtService.verify(accessToken, {
        secret: process.env.SECRET_ACCESS_KEY || 'ACCESS_SECRET',
      })
      return decoded
    } catch (e) {
      return null
    }
  }

  async findRefreshToken(refreshToken: string) {
    const token = await this.tokensRepository.findOne({
      where: { refreshToken },
    })
    return token
  }
}
