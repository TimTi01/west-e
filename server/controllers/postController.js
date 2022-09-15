const { Post } = require("../models/models")
const Sequelize = require('sequelize')
const Op = Sequelize.Op

class PostController {
    async getAll(req, res, next) {
        let {limit, page, post_name} = req.query
        page = page || 1
        limit = limit || 9
        post_name = post_name || ''
        let offset = page * limit - limit 

        const posts = await Post.findAndCountAll({
            limit, 
            offset, 
            where:{ 
                post_name: { [Op.startsWith]: post_name }
            }
        })

        return res.json(posts)
    }

    async create(req, res, next) {
        const {post_name, employeeId} = req.body
        const post = await Post.create({post_name, employeeId})
        return res.json(post)
    }
}

module.exports = new PostController()