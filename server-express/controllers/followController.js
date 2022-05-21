const service = require('../services/followService')
//Підключаюм сервіс для авторизації

class FollowControles {
  async getAFollower(req, res, next) {
    try {
      const follows = await service.getAFollower(req.user.id, +req.params.id)
      res.json({ follows })
    } catch (e) {
      next(e)
    }
  }

  async startFollowing(req, res, next) {
    try {
      const response = await service.startFollowing(req.user.id, +req.params.id)
      res.json(response)
    } catch (e) {
      next(e)
    }
  }

  async stopFollowing(req, res, next) {
    try {
      const response = await service.stopFollowing(req.user.id, +req.params.id)
      res.json(response)
    } catch (e) {
      next(e)
    }
  }
}

module.exports = new FollowControles()
