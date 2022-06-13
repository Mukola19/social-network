import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Redirect,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { ValidationPipe } from 'src/pipes/validation.pipe'
import { TokenDto } from 'src/token/dto/token.dto'
import { PasswordResetService } from 'src/password-reset/password-reset.service'
import { TransformInterceptor } from 'src/interceptors/transform.interceptor'
import { ResetPasswordKeyDto } from 'src/password-reset/request-dto/reset-password-key.dto'
import { ResetPasswordDto } from 'src/password-reset/request-dto/reset-password.dto'
import { LoginUserDto } from './request-dto/login-user.dto'
import { RegisterUserDto } from './request-dto/regis-user.dto'
import { ChangePasswordDto } from './request-dto/change-password.dto'
import { UserAuthResDto } from './response-dto/user-auth-res.dto'
import { AuthService } from './auth.service'
import { JwtAuthGuard } from './jwt-auth.guard'
import { UserAuth } from './user-auth.decorator'
import { CookieLife } from 'src/enuns/enums'

@ApiTags('Authentication')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private paswordResetService: PasswordResetService
  ) {}

  @ApiOperation({ summary: 'Створення користувача' })
  @ApiResponse({ status: 200, type: UserAuthResDto })
  @UsePipes(ValidationPipe)
  @Post('registration')
  async registration(
    @Body() dto: RegisterUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const { user, refreshToken } = await this.authService.registration(dto)
    res.cookie('refreshToken', refreshToken, {
      maxAge: CookieLife.Month,
      httpOnly: true,
    })
    const userDto = new UserAuthResDto(user)
    return { data: userDto }
  }

  @ApiOperation({ summary: 'Авторизація користувача' })
  @ApiResponse({ status: 200, type: UserAuthResDto })
  @UsePipes(ValidationPipe)
  @Post('login')
  async login(
    @Body() dto: LoginUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const { user, refreshToken } = await this.authService.login(dto)
    res.cookie('refreshToken', refreshToken, {
      maxAge: CookieLife.Month,
      httpOnly: true,
    })
    const userDto = new UserAuthResDto(user)
    return { data: userDto }
  }

  @ApiOperation({ summary: 'Авторизація користувача' })
  @ApiResponse({ status: 200, type: UserAuthResDto })
  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async logout(
    @Res({ passthrough: true }) res: Response,
    @UserAuth() user: TokenDto | null
  ) {
    const tokenData = this.authService.logout(user.id)
    res.clearCookie('refreshToken')
    return { data: tokenData }
  }

  @ApiOperation({ summary: 'Авторизація користувача' })
  @ApiResponse({ status: 200, type: UserAuthResDto })
  @Get('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    const { user, refreshToken } = await this.authService.refresh(
      req.cookies.refreshToken || ''
    )
    res.cookie('refreshToken', refreshToken, {
      maxAge: CookieLife.Month,
      httpOnly: true,
    })

    const userDto = new UserAuthResDto(user)
    return { data: userDto }
  }

  @ApiOperation({ summary: 'Активація акаунта' })
  @Get('activateEmail/:linkId')
  @Redirect(process.env.CLIENT_URL)
  async activateEmail(@Param('linkId') linkId: string) {
    this.authService.activateEmail(linkId)
    const data = { url: process.env.CLIENT_URL }
    return { data }
  }

  @ApiOperation({ summary: 'Активація акаунта' })
  @UseGuards(JwtAuthGuard)
  @Post('changePass')
  async changePassword(
    @Body() dto: ChangePasswordDto,
    @UserAuth() user: TokenDto
  ) {
    const message = await this.authService.changePassword(user, dto)
    return { message }
  }

  @UseInterceptors(TransformInterceptor)
  @Post('password/reset/key')
  async getKeyForPass(@Body() dto: ResetPasswordKeyDto) {
    const message = await this.paswordResetService.getKeyForPass(dto.email)
    return { message }
  }

  @Post('password/reset')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    const message = await this.paswordResetService.resetPassword(dto)
    return { message }
  }
}
