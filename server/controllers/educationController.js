const { Education } = require("../models/models")
const Sequelize = require('sequelize')
const Op = Sequelize.Op

class EducationController {
    async getAll(req, res, next) {
        let {limit, page, education_name} = req.query
        page = page || 1
        limit = limit || 9
        education_name = education_name || ''
        let offset = page * limit - limit 

        const educations = await Education.findAndCountAll({
            limit, 
            offset, 
            where:{ 
                education_name: { [Op.startsWith]: education_name }
            }
        })

        return res.json(educations)
    }

    async create(req, res, next) {
        const {education_name} = req.body
        const education = await Education.create({education_name})
        return res.json(education)
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params
            const findEducationById = await Education.findOne({ where: {id: `${id}`} })
            
            if (!findEducationById) {
                res.status(404).send({
                    status: 'error',
                    message: `Education with id: ${id} not found`
                })
            }
            
            const deleteEducation = await findEducationById.destroy()
            
            if (!deleteEducation) {
                res.status(503).send({
                    status: 'error',
                    message: `Education with id: ${id} failed deleted`
                })
            }
            
            res.status(200).send({
                status: 'success',
                message: `Education with id ${id} deleted`
            })

        } catch (error) {
            next(error);
        }
    }
}

module.exports = new EducationController()