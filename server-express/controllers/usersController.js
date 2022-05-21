const service = require('../services/usersService')
//Підключаюм сервіс для авторизації

class UsersControler {
  async requestUsers(req, res, next) {
    try {
      const users = await service.requestUsers({ userId: req.user.id, ...req.query})
      res.json(users)
    } catch (e) {
      next(e)
    }
  }
}

module.exports = new UsersControler()
