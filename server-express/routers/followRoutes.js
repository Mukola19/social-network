const { Router } = require('express')
//Підключаюм контролер для авторизації
const controller = require('../controllers/followController')
const access = require('../middleware/accessMiddleware')

const router = Router()

router.get('/:id', access, controller.getAFollower)
router.post('/:id', access, controller.startFollowing)
router.delete('/:id', access, controller.stopFollowing)

module.exports = router
