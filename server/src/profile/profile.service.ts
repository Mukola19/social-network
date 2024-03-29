import { MailerService } from '@nestjs-modules/mailer'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { FilesService } from 'src/files/files.service'
import { User } from 'src/users/users.model'
import { v4 } from 'uuid'
import { ProfileServiceDto } from './request-dto/profile-service.dto'
import { ProfileDto } from './request-dto/profile.dto'
import { ProfileResDto } from './response-dto/profile-res.dto'

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private filesService: FilesService,
    private mailerService: MailerService
  ) {}

  async getProfile(userId: number, profileId: number) {
    const profile = await this.userRepository.findByPk(profileId, {
      include: { all: true },
    })
    return profile
  }

  async updateProfile(
    userId: number,
    dto: ProfileServiceDto,
    photo: Express.Multer.File
  ) {
    const user = await this.userRepository.findByPk(userId, {
      include: { all: true },
    })
    if (user.email !== dto.email) {
      const linkId = v4()
      user.linkId = linkId
      await this.mailerService.sendMail({
        to: dto.email,
        from: process.env.MAIL_EMAIL,
        subject: 'Activate email',
        text: '',
        html: /*html*/ `<a href="${linkId}">${linkId}</a>`,
      })
    }

    if (photo) {
      user.photoName = await this.updatePhoto(userId, photo)
    }


    user.isActivated = false
    user.update(dto)
    user.save()
    return user
  }

  async updatePhoto(userId: number, photo: Express.Multer.File) {
    const user = await this.userRepository.findByPk(userId)
    if (user.photoName) {
      await this.filesService.deleteFile(user.photoName)
    }
    const photoName = await this.filesService.saveFile(photo)
    user.photoName = photoName
    user.save()
    return photoName
  }
  async removePhoto(userId: number) {
    const user = await this.userRepository.findByPk(userId)
    if (!user.photoName) {
      throw new HttpException('Не має фото', HttpStatus.BAD_REQUEST)
    }
    const photoData = await this.filesService.deleteFile(user.photoName)
    user.destroy()
    return photoData
  }
}
