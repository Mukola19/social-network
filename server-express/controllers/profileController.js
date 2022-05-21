const service = require('../services/profileService')
//Підключаюм сервіс для авторизації

class UsersControler {
  async requestProfile(req, res, next) {
    try {
      const profile = await service.requestProfile(req.user.id, req.params.id)
      res.json(profile)
    } catch (e) {
      next(e)
    }
  }

  async updateProfile(req, res, next) {
    try {
      const newData = { ...req.body }
      newData.userId = req.user.id
      const users = await service.updateProfile(newData)
      res.json(users)
    } catch (e) {
      next(e)
    }
  }

  async updatePhoto(req, res, next) {
    try {
      const photo = req.files.photo
      const photoData = await service.updatePhoto(req.user.id, photo)
      res.json(photoData)
    } catch (e) {
      next(e)
    }
  }

  async deletePhoto(req, res, next) {
    try {
      const photoData = await service.deletePhoto(req.user.id)
      res.json(photoData)
    } catch (e) {
      next(e)
    }
  }
}

module.exports = new UsersControler()
