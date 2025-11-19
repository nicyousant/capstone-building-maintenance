
import Task from "../models/Task.js"

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).json(tasks)
        console.log(e.message)
        res.status(400).json({ error: e.message })
    } catch(e) {
        console.log(e.message)
        res.status(400).json({ error: e.message })
    }
}

const createTask = async (req, res) => {
    try {
        console.log(req.body);
        const task = await Task.create(req.body)
        res.status(200).json(task)
    } catch(e) {
        console.log(e.message)
        res.status(400).json({ error: e.message })
    }
}


const deleteTask = async (req, res) => {
    try {
        const response = await Task.findByIdAndDelete(req.params.id)
        console.log(response)
        res.status(200).json(response)
    } catch(e) {
        console.log(e)
        res.status(400).json({ error: e.message })
    }
}

// const updateTask = async (req, res) => {
//     try {
//         const todo = await Task.findById(req.params.id)
//         todo.completed = !todo.completed
//         await todo.save()
//         res.status(200).json(todo)
//     } catch(e) {
//         console.log(e)
//         res.status(400).json({ error: e.message })
//     }
// }

export default {
    createTask,
    getTasks,
    deleteTask
}
