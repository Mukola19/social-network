import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Op } from 'sequelize'
import { Friends } from 'src/friends/friends.model'
import { CreateUserDto } from './dto/create-user.dto'
import { UserAllDto } from './ResponseDTOs/user-all.dto'
import { User } from './users.model'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(dto: CreateUserDto) {
    let user = await this.userRepository.create(dto)
    user = user.get({ plain: true })
    return user
  }

  async getAllUsers({ userId, count, page, term, friend }) {
    page = +page || 1
    term = term ? term.toLowerCase() : ''
    let limit = +count || 10
    let offset = limit * page - limit

    const users = await this.userRepository.findAndCountAll({
      offset,
      limit,
      where: {
        fullName: {
          [Op.like]: '%' + term + '%',
        },
      },
      include: [
        { model: Friends, as: 'followedBy' },
        { model: Friends, as: 'follower' },
      ],
    })

    let usersDto = users.rows.map((user) => new UserAllDto(user, userId)) // userDto(user, userId)

    switch (friend) {
      case 'true':
        usersDto = usersDto.filter((user) => user.followedByIs !== false)
        break
      case 'false':
        usersDto = usersDto.filter((user) => user.followedByIs !== true)
        break
    }

    return { items: usersDto, totalCount: users.count }
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    })
    return user
  }

  async getUserByLinkId(linkId: string) {
    const user = await this.userRepository.findOne({ where: { linkId } })
    return user
  }
}
