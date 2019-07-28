const Sequelize = require('sequelize')

const connection = new Sequelize('pinterest_api', 'root', 'mysql', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection