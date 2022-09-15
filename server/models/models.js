const sequelize = require('../db')
const {DataTypes} = require('sequelize')

//db table settings 

const Employee = sequelize.define('employee', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    full_name: {type: DataTypes.STRING},
})

const Post = sequelize.define('post', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    post_name: {type: DataTypes.STRING},
})

const Education = sequelize.define('education', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    education_name: {type: DataTypes.STRING},
})

// Dependencies between tables
Employee.hasMany(Post)
Post.belongsTo(Employee)

Employee.hasMany(Education)
Education.belongsTo(Employee)

module.exports = {
    Employee,
    Post,
    Education
}