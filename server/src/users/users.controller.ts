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
  async createUser(@Body() dto: CreateUserDto) {
    const user = await this.usersService.createUser(dto)
    return { data: user }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllUser(@Query() query: UsersQueryDto, @UserAuth() user: TokenDto) {
    const users = await this.usersService.getAllUsers({
      userId: user.id,
      ...query,
    })
    console.log(users)

    return { data: users }
  }
}
