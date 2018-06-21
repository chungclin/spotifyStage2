const Sequelize = require('sequelize')
const db = (require('./_db'))

const Day = db.define('day', {
    dayOfWeek: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dayOfMonth: {
        type: Sequelize.INTEGER,
        allowNull: false, 
    },
    monthAndDay: {
        type: Sequelize.VIRTUAL,
        get() {
            return (`${this.getDataValue('monthId')}/${this.getDataValue('dayOfMonth')}`)
        }
    }
})

module.exports = Day