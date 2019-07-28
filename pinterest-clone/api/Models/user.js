const Sequelize = require ('sequelize')
const conecction = require('../sql')

const User = conecction.define('user',{
    username:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    mail:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = User