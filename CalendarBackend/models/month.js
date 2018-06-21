const Sequelize = require('sequelize')
const db = (require('./_db'))

const Month = db.define('month', {
    month: {
        type: Sequelize.TEXT,
        allowNull: false
    },
})

module.exports = Month