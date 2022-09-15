const Router = require('express')
const { getAll, create } = require('../controllers/employeeController')
const router = new Router()

// api/employee/getAll
router.get('/getAll', getAll)
// api/employee/create
router.post('/create', create)

module.exports = router