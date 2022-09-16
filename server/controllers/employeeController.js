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
        const employee = await Employee.create({full_name, postId, educationId})
        return res.json(employee)
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params
            const findEmployeesById = await Employee.findOne({ where: {id: `${id}`} })
            
            if (!findEmployeesById) {
                res.status(404).send({
                    status: 'error',
                    message: `Employee with id: ${id} not found`
                })
            }
            
            const deleteEmployee = await findEmployeesById.destroy()
            
            if (!deleteEmployee) {
                res.status(503).send({
                    status: 'error',
                    message: `Employee with id: ${id} failed deleted`
                })
            }
            
            res.status(200).send({
                status: 'success',
                message: `Employee with id ${id} deleted`
            })

        } catch (error) {
            next(error);
        }
    }

    async updateOne(req, res, next) {
        try {
            let { id } = req.params
            let { full_name, postId, educationId } = req.body
            const findEmployeeById = await Employee.findOne({ where: {id} })

            if (!findEmployeeById) {
                res.status(404).send({
                    status: 'error',
                    message: `Employee with id: ${id} not found`
                })
            }

            if (full_name) findEmployeeById.full_name = full_name 
            if (postId) findEmployeeById.postId = postId 
            if (educationId) findEmployeeById.educationId = educationId 
            
            const updateEmployee = await findEmployeeById.save()
    
            if (!updateEmployee) {
                res.status(400).send({
                    status: 'error',
                    message: `Employee with id: ${id} failed update`
                })
            }

            res.status(200).send({
                status: 'success',
                data: updateEmployee,
            })

        } catch (error) {
            next(error);
        }
    }
}

module.exports = new EmployeeController()