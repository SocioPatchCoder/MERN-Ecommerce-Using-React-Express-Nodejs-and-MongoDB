const router = require('express').Router();

const categoryCtrl = require('../controllers/categoryCtrl')
const auth = require('../middlewares/auth')
const authAdmin = require('../middlewares/authAdmin')

router.route('/category')
.get(categoryCtrl.getCategories)
.post(auth,authAdmin,categoryCtrl.createCategory)

router.route('/category/:id')
.delete(auth,authAdmin,categoryCtrl.deleteCategory)
.put(auth,authAdmin,categoryCtrl.updateCategory)

module.exports = router