import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { TokenService } from 'src/token/token.service'
import { Observable } from 'rxjs'

@Injectable()
export class JwtAuthGuard implements CanActivate {

  constructor(private tokenService: TokenService) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest()

    try {
      const authHeader = req.headers.authorization
      const bearer = authHeader.split(' ')[0]
      const accessToken = authHeader.split(' ')[1]

      if (bearer !== 'Bearer' || !accessToken) {
        throw new UnauthorizedException({
          message: 'Користувач не авторизований',
        })
      }

      const user = this.tokenService.validateAccessToken(accessToken)
      if (!user) {
        throw new UnauthorizedException({
          message: 'Користувач не авторизований',
        })
      }
      

      req.user = user

      return true
    } catch (e) {

      throw new UnauthorizedException({
        message: 'Користувач не авторизований',
      })
    }
  }
}
