const router = require('express').Router()
const { Day, Month, Event } = require('../models')



router.get('/', (req, res, next) => {
    Month.findAll()
        .then(foundMonths => {
            res.json(foundMonths)
        })
        .catch(next)
})

router.get('/:id', (req, res, next) => {
    Day.findAll({
        where: {
            monthId: Number(req.params.id)
        }
    })
        // .then(foundMonth => res.json(foundMonth.sort((a, b) => {
        //     a['dayOfMonth'] - b['dayOfMonth']
        // })))
        .then(foundMonth => foundMonth.sort((a, b) => {
                a['dayOfMonth'] - b['dayOfMonth']
            }))
        .then(sorted => res.json(sorted))
        .catch(next)
})

module.exports = router