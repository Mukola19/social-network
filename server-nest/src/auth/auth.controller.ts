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
import { ValidationPipe } from 'src/pipes/validation.pipe'
import { TokenDto } from 'src/token/dto/token.dto'
import { AuthService } from './auth.service'
import { LoginUserDto } from './request-dto/login-user.dto'
import { RegisterUserDto } from './request-dto/regis-user.dto'
import { JwtAuthGuard } from './jwt-auth.guard'
import { UserAuth } from './user-auth.decorator'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { UserAuthResDto } from './response-dto/user-auth-res.dto'

@ApiTags('Authentication')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
 
  @ApiOperation({ summary: 'Створення користувача' })
  @ApiResponse({ status: 200, type: UserAuthResDto })
  @UsePipes(ValidationPipe)
  @Post('/registration')
  async registration( 
    @Body() dto: RegisterUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const { user, refreshToken } = await this.authService.registration(dto)
    res.cookie('refreshToken', refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    })
    return new UserAuthResDto(user)
  }

  @ApiOperation({ summary: 'Авторизація користувача' })
  @ApiResponse({ status: 200, type: UserAuthResDto })
  @UsePipes(ValidationPipe)
  @Post('login')
  async login(
    @Body() dto: LoginUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const  { user, refreshToken } = await this.authService.login(dto)
    res.cookie('refreshToken', refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    })
    return new UserAuthResDto(user)
  }

  @ApiOperation({ summary: 'Авторизація користувача' })
  @ApiResponse({ status: 200, type: UserAuthResDto })
  @UseGuards(JwtAuthGuard)
  @Get('logout')
  logout(
    @Res({ passthrough: true }) res: Response,
    @UserAuth() user: TokenDto | null
  ) {
    const tokenData = this.authService.logout(user.id)
    res.clearCookie('refreshToken')
    return tokenData
  }

  @ApiOperation({ summary: 'Авторизація користувача' })
  @ApiResponse({ status: 200, type: UserAuthResDto })
  @Get('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ){
    const { user, refreshToken } = await this.authService.refresh(
      req.cookies.refreshToken || ''
    )
    res.cookie('refreshToken', refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    })

    return new UserAuthResDto(user)
  }

  @ApiOperation({ summary: 'Активація акаунта' })
  @Get('activateEmail/:linkId')
  @Redirect(process.env.CLIENT_URL)
  activateEmail(@Param('linkId') linkId: string) {
    this.authService.activateEmail(linkId)
    return { url: process.env.CLIENT_URL }
  }
}
