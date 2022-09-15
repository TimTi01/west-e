const Router = require('express')
const { getAll, create } = require('../controllers/postController')
const router = new Router()

// api/post/getAll
router.get('/getAll', getAll)
// api/post/create
router.post('/create', create)

module.exports = router