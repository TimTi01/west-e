const sequelize = require('../db')
const {DataTypes} = require('sequelize')

//db table settings 

const Employee = sequelize.define('employee', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    full_name: {type: DataTypes.STRING},
},
{
    timestamps: false
})

const Post = sequelize.define('post', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    post_name: {type: DataTypes.STRING},
},
{
    timestamps: false,
})

const Education = sequelize.define('education', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    education_name: {type: DataTypes.STRING},
},
{
    timestamps: false,
})

// Dependencies between tables
// Employee.hasOne(Post)
// Post.belongsTo(Employee)

Post.hasOne(Employee)
Employee.belongsTo(Post)

Education.hasOne(Employee)
Employee.belongsTo(Education)

module.exports = {
    Employee,
    Post,
    Education
}