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

const events = [
    {
        name: 'Job Interview', 
        description: 'Spotify Job Interview',
        startTime: '00:12',
        endTime: '12:12',
        dayId: 35
    },
    {
        name: 'Cook Dinner', 
        description: 'Chicken and Broccoli',
        startTime: '12:43',
        endTime: '12:59',
        dayId: 45
    },
    {
        name: 'Haircut', 
        description: 'Cut the hair',
        startTime: '13:12',
        endTime: '14:45',
        dayId: 35
    },
    {
        name: 'Dinner', 
        description: 'Eating with wife',
        startTime: '17:12',
        endTime: '18:12',
        dayId: 34
    },
    {
        name: 'Brunch with mom', 
        description: 'Brunching with momma',
        startTime: '10:12',
        endTime: '12:12',
        dayId: 33
    },
    {
        name: 'Wedding', 
        description: 'Eating prime rib',
        startTime: '18:12',
        endTime: '20:12',
        dayId: 274
    },
    {
        name: 'Guitar Tuning', 
        description: 'Enter Address here',
        startTime: '00:12',
        endTime: '12:12',
        dayId: 32
    },
    {
        name: 'Buy school supples', 
        description: 'pencils, pen, paper',
        startTime: '00:12',
        endTime: '12:12',
        dayId: 91
    },
    {
        name: 'Take medicine', 
        description: 'Go to drug store',
        startTime: '20:12',
        endTime: '21:12',
        dayId: 91
    },
    {
        name: 'Play basketball', 
        description: 'Go to ballcourt',
        startTime: '12:12',
        endTime: '16:12',
        dayId: 91
    },
    {
        name: 'Shopping with mom', 
        description: 'Go shopping',
        startTime: '12:12',
        endTime: '12:42',
        dayId: 32
    },
    {
        name: 'New Years Day', 
        description: 'New Years',
        startTime: '16:12',
        endTime: '22:12',
        dayId: 1
    },
    {
        name: 'Reading Party', 
        description: 'Bookstore here',
        startTime: '00:12',
        endTime: '12:12',
        dayId: 2
    },
    {
        name: 'Buy cigarettes', 
        description: 'Go to convenience',
        startTime: '10:52',
        endTime: '11:12',
        dayId: 32
    },
    {
        name: 'Final exam', 
        description: 'Study!',
        startTime: '10:12',
        endTime: '12:12',
        dayId: 36
    },
    {
        name: 'Oil Change', 
        description: 'Spotify Job Interview',
        startTime: '12:32',
        endTime: '12:52',
        dayId: 40
    }
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
    .then(() => 
    Promise.all(events.map(event => 
        Event.create(event))
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