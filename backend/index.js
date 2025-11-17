import express from 'express'

import cors from 'cors'

// create express app
const app = express()

const port = 8080

//middleware
app.use(cors())

// add a get request to our base URL of our API
app.get('/', (req, res) => {
    res.json('Hello! (from server)')
})

// listen on a particular port
// when it makes a successful connection, run the callback function
app.listen(port, () => {
    console.log('Listening on port: ' + port)
}) 

