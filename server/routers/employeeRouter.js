const Router = require('express')
const employeeController = require('../controllers/employeeController')
const router = new Router()

// api/employee/getAll
router.get('/getAll', employeeController.getAll)
// api/employee/create
router.post('/create', employeeController.create)
// api/employee/delete
router.delete('/delete/:id', employeeController.delete)
// api/employee/update
router.put('/update/:id', employeeController.updateOne)

module.exports = router