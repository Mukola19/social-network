const { User, Friend } = require('../models/models')
const ApiError = require('../ApiError/ApiError')

class FollowService {
  async getAFollower() {}

  async startFollowing(userId, friendId) {
    const [friend, beganFollow] = await Friend.findOrCreate({
      where: { userId, friendId },
    })

    return beganFollow
  }

  async stopFollowing(userId, friendId) {
    const friend = await Friend.findOne({ where: { userId, friendId } })
    if (!friend) throw ApiError.notFound()

    const stoppedFollow = await Friend.destroy({
      where: { userId, friendId },
      force: true,
    })

    return !!stoppedFollow
  }
}

module.exports = new FollowService()
