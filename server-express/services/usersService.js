const { User, Friend } = require('../models/models')
const UserDto = require('../dtos/userDto')
const sequelize = require('../db')

function parseQuery(obj) {
  const result = {}
  Object.keys(obj).forEach((key) => {
    // if (obj[key] !== undefined) {
    // result[key] = JSON.parse(obj[key])
    console.log(obj[key])
    // }
  })
  return result
}

class UsersService {
  async requestUsers({ userId, count, page, term, friend }) {
    let limit = +count || 10
    page = page || 1
    let offset = limit * page - limit

    term = term && term.toLowerCase()

    let users = []

    if (term) {
      users = await User.findAndCountAll({
        offset,
        limit,
        where: {
          fullName: sequelize.where(
            sequelize.fn('LOWER', sequelize.col('fullName')),
            'LIKE',
            '%' + term + '%'
          ),
        },
        include: { model: Friend, as: 'friends' },
      })
    } else {
      users = await User.findAndCountAll({
        offset,
        limit,
        include: { model: Friend, as: 'friends' },
      })
    }

    let usersDto = users.rows.map((user) => new UserDto(user, userId)) // userDto(user, userId)

    switch (friend) {
      case 'true':
        usersDto = usersDto.filter((user) => user.followed !== false)
        break
      case 'false':
        usersDto = usersDto.filter((user) => user.followed !== true)
        break
    }

    return { items: usersDto, totalCount: users.count }
  }
}

module.exports = new UsersService()
