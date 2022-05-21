import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { UserAuth } from 'src/auth/user-auth.decorator'
import { ValidationPipe } from 'src/pipes/validation.pipe'
import { TokenDto } from 'src/token/dto/token.dto'
import { Token } from 'src/token/token.model'
import { ProfileDto } from './ request-dto/profile.dto'
import { ProfileService } from './profile.service'

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':profileId')
  getProfile(
    @Param('profileId', ParseIntPipe) profileId: number,
    @UserAuth() user: TokenDto
  ) {
    const profile = this.profileService.getProfile(user.id, profileId)
    return profile
  }

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Put()
  updateProfile(@Body() profileData: ProfileDto, @UserAuth() user: TokenDto) {
    const profile = this.profileService.updateProfile(user.id, profileData)
    return profile
  }

  @UseGuards(JwtAuthGuard)
  @Put('photo')
  @UseInterceptors(FileInterceptor('photo'))
  updatePhoto(
    @UploadedFile() photo: Express.Multer.File,
    @UserAuth() user: TokenDto
  ) {
    const photoUrl = this.profileService.updatePhoto(user.id, photo)
    return photoUrl
  }

  @UseGuards(JwtAuthGuard)
  @Delete('photo')
  removePhoto(@UserAuth() user: TokenDto) {
    const photoData = this.profileService.removePhoto(user.id)
    return photoData
  }
}
