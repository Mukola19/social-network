import { Body, Controller, Get, Post } from '@nestjs/common'
import { PasswordResetService } from './password-reset.service'
import { ResetPasswordDto } from './request-dto/reset-password.dto'

@Controller('password-reset')
export class PasswordResetController {
  constructor(private paswordResetService: PasswordResetService) {}

  @Post('secret-key')
  getSecretKeyForPass(@Body('email') email: string) {
      const result = this.paswordResetService.getSecretKeyForPass(email)
      return result
  }

  @Post('')
  passwordReset(@Body() dto: ResetPasswordDto) {
      const result = this.paswordResetService.passwordReset(dto)
      return result
  }
}
