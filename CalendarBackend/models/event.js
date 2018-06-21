const Sequelize = require('sequelize')
const db = (require('./_db'))

const Event = db.define('event', {
    name: {
        type: Sequelize.STRING,
        allowNull: false, 
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

module.exports = Event