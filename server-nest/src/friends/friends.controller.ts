import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { UserAuth } from 'src/auth/user-auth.decorator'
import { TokenDto } from 'src/token/dto/token.dto'
import { FriendsService } from './friends.service'

@Controller('friends')
export class FriendsController {
  constructor(private friendsService: FriendsService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  checkFollow(
    @Param('id', ParseIntPipe) id: number,
    @UserAuth() user: TokenDto
  ) {
    const result = this.friendsService.checkFollow({
      followedById: id,
      followerId: user.id,
    })
    return result
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id')
  follow(@Param('id', ParseIntPipe) id: number, @UserAuth() user: TokenDto) {
    const result = this.friendsService.follow({
      followedById: id,
      followerId: user.id,
    })
    return result
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  unfollow(@Param('id', ParseIntPipe) id: number, @UserAuth() user: TokenDto) {
    const result = this.friendsService.unfollow({
      followedById: id,
      followerId: user.id,
    })
    return result
  }
}
