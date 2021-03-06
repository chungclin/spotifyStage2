const router = require('express').Router()
const { Day, Month, Event } = require('../models')


// /api/months/
//get single month
router.get('/:monthid', (req, res, next) => {
    Day.findAll({
        where: {
            monthId: Number(req.params.monthid)
        }
    }, {
        include: [{ all: true }]
    })
    .then(sorted => res.json(sorted))
    .catch(next)
})

//get events for that day
router.get('/:monthid/day/:dayid/events', (req, res, next) => {
    let dayId = +req.params.dayid
    return Event.findAll({
        where: {
            dayId: Number(dayId)
        }
    }, {
        include: [ true ]
    })
    .then(foundEvents => res.json(foundEvents))
    .catch(next)
})


//post event to day of month
router.post('/:monthid/day/:dayid/events', (req, res, next) => {
    Event.create(req.body)
    .then(eventCreated => {
		res.json({
			message: 'Created successfully',
			event: eventCreated
		});
	})
	.catch(next)
})

//put/update an event
router.put('/:monthid/day/:dayid/events/:eventid', (req, res, next) => {
    let eventid = +req.params.eventid
    let { name, description, startTime, endTime } = req.body
    Event.findOne({
        where: {
            id: eventid
        }
    })
    .then(foundEvent => {
        foundEvent.update({
            name,
            description,
            startTime,
            endTime
        })
    })
    .catch(next)
})


//delete event from day of month
router.delete('/:monthid/day/:dayid/events/:eventid', (req, res, next) => {
    const dayid = req.params.dayid;
    const eventId = +req.params.eventid
	Event.findById(eventId)
	.then(foundEvent => foundEvent.destroy())
	.then(console.log('deleted successfully'))
	.catch(next);
});


//get all months
router.get('/', (req, res, next) => {
    Month.findAll({
        include: [{ all: true }]
    })
        .then(foundMonths => {
            res.json(foundMonths)
        })
        .catch(next)
})



module.exports = router