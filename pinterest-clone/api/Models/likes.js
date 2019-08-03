const Sequelize = require ('sequelize')
const conecction = require('../sql')

const Likes = conecction.define('likes',{
    url: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    id_user: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email_user:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Likes