const db = require('./_db')
 

const Event = require('./event')
const Day = require('./day')
const Month = require('./month')


Day.hasMany(Event)
Month.hasMany(Day)
Event.belongsTo(Day)
Day.belongsTo(Month)

module.exports = {db, Day, Month, Event}