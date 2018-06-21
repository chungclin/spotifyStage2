// const db = require('../CalendarBackend/models')
const { Day,
        Event,
        Month, 
        db
} = require('../CalendarBackend/models')

async function seed() {
    await db.sync({ force: true })
    console.log('db synced!')

    const months = await Promise.all([
        Month.create({
            month: 'January'
        })
    ])

}


seed()
    .catch(err => {
        console.err(err.message)
        console.err(err.stack)
        process.exitCode = 1
    })
    .then(() => {
        console.log('closing db connection')
        db.close()
        console.log('db connection closed')
    })


console.log('seeding.....')