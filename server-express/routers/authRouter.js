const { Router } = require('express')
//Підключаюм контролер для авторизації
const controller = require('../controllers/authController')

const router = Router()

router.post('/register', controller.register)
router.post('/login', controller.login)
router.get('/logout', controller.logout)
router.get('/activateEmail/:linkId', controller.activateEmail)
router.get('/refresh', controller.refresh)

module.exports = router
