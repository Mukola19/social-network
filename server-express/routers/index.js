const { Router } = require('express')

const router = Router()

router.use('/auth', require('./authRouter'))
router.use('/users', require('./usersRouter'))
router.use('/follow', require('./followRoutes'))
router.use('/profile', require('./profileRouter'))

module.exports = router
