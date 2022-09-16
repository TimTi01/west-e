const Router = require('express')
const postController = require('../controllers/postController')
const router = new Router()

// api/post/getAll
router.get('/getAll', postController.getAll)
// api/post/create
router.post('/create', postController.create)
// api/post/create
router.delete('/delete/:id', postController.delete)

module.exports = router