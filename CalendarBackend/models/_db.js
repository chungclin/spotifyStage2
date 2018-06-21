const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost:5432/events')

module.exports = db