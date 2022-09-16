const Router = require('express')
const educationController = require('../controllers/educationController')
const router = new Router()

// api/education/getAll
router.get('/getAll', educationController.getAll)
// api/education/create
router.post('/create', educationController.create)
// api/education/delete
router.delete('/delete/:id', educationController.delete)

module.exports = router