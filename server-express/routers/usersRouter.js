const { Router } = require('express')
const controller = require('../controllers/usersController')
const access = require('../middleware/accessMiddleware')

const router = Router()

router.get('/', access, controller.requestUsers)

module.exports = router
