const Sequelize = require('sequelize')
const db = (require('./_db'))

const events = db.define('event', {
    name: {
        type: Sequelize.STRING,
        allowNull: false, 
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})