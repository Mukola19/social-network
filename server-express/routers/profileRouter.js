const { Router } = require('express')
const controller = require('../controllers/profileController')
const access = require('../middleware/accessMiddleware')

const router = Router()

router.get('/:id', access, controller.requestProfile) //user profile by user ID
router.put('/', access, controller.updateProfile) //update profile
router.put('/photo', access, controller.updatePhoto)
router.delete('/photo', access, controller.deletePhoto)

module.exports = router
