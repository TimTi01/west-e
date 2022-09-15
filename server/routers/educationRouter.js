const Router = require('express')
const { getAll, create } = require('../controllers/educationController')
const router = new Router()

// api/education/getAll
router.get('/getAll', getAll)
// api/education/create
router.post('/create', create)

module.exports = router