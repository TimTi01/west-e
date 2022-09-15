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
}

module.exports = new EducationController()