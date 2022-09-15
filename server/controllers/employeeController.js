const { Employee, Post, Education } = require("../models/models")
const Sequelize = require('sequelize')
const Op = Sequelize.Op

class EmployeeController {
    async getAll(req, res, next) {
        let {limit, page, full_name} = req.query
        page = page || 1
        limit = limit || 9
        full_name = full_name || ''
        let offset = page * limit - limit 

        const employees = await Employee.findAndCountAll({
            limit, 
            offset, 
            where:{ 
                full_name: { [Op.startsWith]: full_name }
            },
            include: [
                {
                    model: Post
                },
                {
                    model: Education
                }
            ]
        })

        return res.json(employees)
    }

    async create(req, res, next) {
        const {full_name, postId, educationId} = req.body

        console.log('req.body: ', req.body)

        const employee = await Employee.create({full_name, postId, educationId})
        return res.json(employee)
    }
}

module.exports = new EmployeeController()