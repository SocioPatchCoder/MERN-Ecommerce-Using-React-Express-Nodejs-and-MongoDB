const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')
const auth = require('../middlewares/auth')

router.post('/register',userCtrl.register)
router.post('/login',userCtrl.login)
router.get('/logout',userCtrl.logout)
router.get('/refresh_token',userCtrl.refreshToken)
router.get('/infor',auth,userCtrl.getUser)
router.patch('/addcart',auth,userCtrl.addCart)
module.exports = router