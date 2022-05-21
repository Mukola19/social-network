import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { UserAuth } from 'src/auth/user-auth.decorator'
import { TokenDto } from 'src/token/dto/token.dto'
import { CreateUserDto } from './dto/create-user.dto'
import { UsersQueryDto } from './dto/users-query.dto'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  createUser(@Body() dto: CreateUserDto) {
    const user = this.usersService.createUser(dto)
    return user
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllUser(@Query() query: UsersQueryDto, @UserAuth() user: TokenDto) {
    const users = this.usersService.getAllUsers({ userId: user.id, ...query })
    return users
  }
}
