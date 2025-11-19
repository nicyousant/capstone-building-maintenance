import express from 'express'

import cors from 'cors'
import 'dotenv/config'
import { connectDB } from './db.js'


import taskRoutes from './routes/tasksroute.js'

// create express app
const app = express()

const port = 8080

//middleware
app.use(express.json())

app.use(cors())

app.use('/tasks', taskRoutes)

// add a get request to our base URL of our API
app.get('/', (req, res) => {
    res.json('Hello! (from server)')
})

// app.get('/tasks', async (req, res) => {
//     try {
//     const tasks = await Task.find({})
//     res.status(200).json(tasks)
//     } catch (e) {
//         console.log(e.message)
//         res.status(400).json({ error: e.message })
//     }
// })


// listen on a particular port
// when it makes a successful connection, run the callback function
app.listen(port, () => {
    console.log('Listening on port: ' + port)
    connectDB()
}) 

