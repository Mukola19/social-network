const service = require('../services/authService')
//Підключаюм сервіс для авторизації

class AuthControles {
  async register(req, res, next) {
    // const { email, password, fullName } = req.body
    try {
      const user = await service.register(req.body)

      res.cookie('refreshToken', user.tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })

      res.json(user)
    } catch (e) {
      next(e)
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body

      const user = await service.login(email, password)

      res.cookie('refreshToken', user.tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })

      res.json(user)
    } catch (e) {
      next(e)
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies

      await service.logout(refreshToken)

      res.clearCookie('refreshToken')

      res.json({ message: 'Ви вийшли' })
    } catch (e) {
      next(e)
    }
  }

  async activateEmail(req, res, next) {
    try {
      const isActivated = await service.activateEmail(req.params.linkId)

      if (!isActivated) return res.status(400)
      res.redirect(
        'https://translate.google.com/?hl=uk&sl=en&tl=uk&text=mail%0A&op=translate'
      )
    } catch (e) {
      next(e)
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies

      const user = await service.refresh(refreshToken)
      res.cookie('refreshToken', user.tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })

      res.json(user)
    } catch (e) {
      next(e)
    }
  }
}

module.exports = new AuthControles()
