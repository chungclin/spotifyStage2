const express = require('express')
const path = require('path')
const app = express()

const volleyball = require('volleyball')
app.use(volleyball)

const bodyParser = require('body-parser')
app.use(bodyParser.json())

app.use('/api', require('./api'))


app.use(express.static(path.join(__dirname, '../public')));


app.use('/api', require('./api')); // include our routes!

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
}); // Send index.html for any other requests


app.get('/', function (req, res){
  res.send('I AM HERE')
})

const { db } = require('./models')
db.sync()
    .then(() => {
        console.log('tables created in db')
        app.listen(3000, () => console.log('listening for requests on port 3000!'))

    })
