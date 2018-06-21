const { Day,
        Event,
        Month, 
        db
} = require('../CalendarBackend/models')


const months = [
    { month: 'January' },
    { month: 'February' },
    { month: 'March' },
    { month: 'April' },
    { month: 'May' },
    { month: 'June' },
    { month: 'July' },
    { month: 'August' },
    { month: 'September' },
    { month: 'October' },
    { month: 'November' },
    { month: 'December' },
]

const days = []

function fillDays() {
    let daysOfWeek = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
    ]
//fill in days and months
    for (let i = 1; i <= 31; i++){
        days.push({monthId: 1, dayOfMonth: i})
    }
    for (let i = 1; i <= 28; i++){
        days.push({monthId: 2, dayOfMonth: i})
    }
    for (let i = 1; i <= 31; i++){
        days.push({monthId: 3, dayOfMonth: i})
    }
    for (let i = 1; i <= 30; i++){
        days.push({monthId: 4, dayOfMonth: i})
    }
    for (let i = 1; i <= 31; i++){
        days.push({monthId: 5, dayOfMonth: i})
    }
    for (let i = 1; i <= 30; i++){
        days.push({monthId: 6, dayOfMonth: i})
    }
    for (let i = 1; i <= 31; i++){
        days.push({monthId: 7, dayOfMonth: i})
    }
    for (let i = 1; i <= 31; i++){
        days.push({monthId: 8, dayOfMonth: i})
    }
    for (let i = 1; i <= 30; i++){
        days.push({monthId: 9, dayOfMonth: i})
    }
    for (let i = 1; i <= 31; i++){
        days.push({monthId: 10, dayOfMonth: i})
    }
    for (let i = 1; i <= 30; i++){
        days.push({monthId: 11, dayOfMonth: i})
    }
    for (let i = 1; i <= 31; i++){
        days.push({monthId: 12, dayOfMonth: i})
    }
//fill in days of week
    for (let i = 0; i < days.length; i++){
        days[i]['dayOfWeek'] = daysOfWeek[i % daysOfWeek.length]
    }
}


fillDays()


const seed = () => 
    Promise.all(months.map(month => 
        Month.create(month)
    ))
    .then(() => 
    Promise.all(days.map(day => 
        Day.create(day))
    ))

    
const main = () => {
    console.log('Syncing db....')
    db.sync({ force: true })
        .then(() => {
            console.log('Seeding Database....')
            return seed()
        })
        .catch(err => {
            console.err(err.message)
            console.err(err.stack)
            process.exitCode = 1
        })
        .then(() => {
            db.close()
            console.log('db connection closed')
        })
}


main()