import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { FriendsDto } from './dto/friends.dto'
import { Friends } from './friends.model'

@Injectable()
export class FriendsService {
  constructor(
    @InjectModel(Friends) private friendsRepository: typeof Friends) {}

  async checkFollow(dto: FriendsDto) {
    const friends = await this.friendsRepository.findOne({ where: { ...dto }})
    if (!friends) {
      throw new HttpException('Ви не підписані', HttpStatus.BAD_REQUEST)
    }
    return 'Ви підписані'
  }
  
  async follow(dto: FriendsDto) {
    const candidates = await this.friendsRepository.findOne({
      where: { ...dto },
    })

    if (candidates) {
      throw new HttpException('Ви вже підписані', HttpStatus.BAD_REQUEST)
    }

    await this.friendsRepository.create(dto)
    return 'Ви підписались'
  }

  async unfollow(dto: FriendsDto) {
    const candidate = await this.friendsRepository.findOne({
      where: { ...dto },
    })
    if (!candidate) {
      throw new HttpException('Ви не підписані', HttpStatus.BAD_REQUEST)
    }
    candidate.destroy()
    return 'Ви відписались'
  }
}
