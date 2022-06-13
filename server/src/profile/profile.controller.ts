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
import { ProfileDto } from './request-dto/profile.dto'
import { ProfileService } from './profile.service'
import { ProfileResDto } from './response-dto/profile-res.dto'

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':profileId')
  async getProfile(
    @Param('profileId', ParseIntPipe) profileId: number,
    @UserAuth() user: TokenDto
  ) {
    const profile = await this.profileService.getProfile(user.id, profileId)
    const profileDto = new ProfileResDto(profile, user.id)
    return { data: profileDto }
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('photo'))
  async updateProfile(
    @Body(ValidationPipe) profileDto: ProfileDto,
    @UserAuth() user: TokenDto,
    @UploadedFile() photo: Express.Multer.File
  ) {
    const profileServiceDto = {
      ...profileDto,
      lookingForAJob: JSON.parse(profileDto.lookingForAJob) as boolean,
    }

    const profile = await this.profileService.updateProfile(
      user.id,
      profileServiceDto,
      photo
    )

    const profileResDto = new ProfileResDto(profile, user.id)
    return { data: profileResDto }
  }

  @UseGuards(JwtAuthGuard)
  @Put('photo')
  @UseInterceptors(FileInterceptor('photo'))
  async updatePhoto(
    @UploadedFile() photo: Express.Multer.File,
    @UserAuth() user: TokenDto
  ) {
    const photoName = await this.profileService.updatePhoto(user.id, photo)
    const photoUrl = process.env.SERVER_URL + '/' + photoName

    return { data: { photoUrl } }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('photo')
  removePhoto(@UserAuth() user: TokenDto) {
    this.profileService.removePhoto(user.id)
    return { message: 'Фото видалено' }
  }
}
