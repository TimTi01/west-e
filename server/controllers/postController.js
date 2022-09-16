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
        const {post_name} = req.body
        const post = await Post.create({post_name})
        return res.json(post)
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params
            const findPostById = await Post.findOne({ where: {id: `${id}`} })
            
            if (!findPostById) {
                res.status(404).send({
                    status: 'error',
                    message: `Post with id: ${id} not found`
                })
            }
            
            const deletePost = await findPostById.destroy()
            
            if (!deletePost) {
                res.status(503).send({
                    status: 'error',
                    message: `Post with id: ${id} failed deleted`
                })
            }
            
            res.status(200).send({
                status: 'success',
                message: `Post with id ${id} deleted`
            })

        } catch (error) {
            next(error);
        }
    }
}

module.exports = new PostController()