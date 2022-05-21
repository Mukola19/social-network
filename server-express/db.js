const { Sequelize } = require('sequelize')

module.exports = new Sequelize('social_network', 'root', '49382716', {
  host: '127.0.0.1',
  dialect: 'mysql',
  port: '3306',
})
