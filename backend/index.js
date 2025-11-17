import express from 'express'

// create express ap
const app = express()

const port = 8080

// add a get request to our base URL of our API
app.get('/', (req, res) => {
    res.json('Hello! (from server)')
})

// listen on a particular port
// when it makes a successful connection, run the callback function
app.listen(port, () => {
    console.log('Listening on port: ' + port)
}) 

