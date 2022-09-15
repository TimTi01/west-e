const Router = require('express')
const router = new Router()
const employeeRouter = require('./employeeRouter')
const postRouter = require('./postRouter')
const educationRouter = require('./educationRouter')

router.use('/employee', employeeRouter)
router.use('/post', postRouter)
router.use('/education', educationRouter)

module.exports = router