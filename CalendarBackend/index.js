const express = require('express')
const path = require('path')
const app = express()

const volleyball = require('volleyball')
app.use(volleyball)

const bodyParser = require('body-parser')
app.use(bodyParser.json())


app.get('/', (req, res, next) => res.send('got to the index'))

const db = require('./models')
db.sync()
    .then(() => {
        console.log('tables created in db')
        app.listen(3000, () => console.log('listening for requests on port 3000!'))

    })
