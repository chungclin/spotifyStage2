const db = require('./_db')
 

const Event = require('./event')
const Day = require('./day')
const Month = require('./month')


Day.hasMany(Event)
Month.hasMany(Day)

module.exports = {db, Day, Month, Event}