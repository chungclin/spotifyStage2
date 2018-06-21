const Sequelize = require('sequelize')
const db = (require('./_db'))

const Day = db.define('day', {
    dayOfMonth: {
        type: Sequelize.INTEGER,
        allowNull: false, 
    },
    dayOfWeek: {
        type: Sequelize.STRING,
        allowNull: false
    },
    monthAndDay: {
        type: Sequelize.VIRTUAL,
        get() {
            return (`${this.getDataValue('monthId')}/${this.getDataValue('dayOfMonth')}`)
        }
    }
})

module.exports = Day