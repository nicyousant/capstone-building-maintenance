
import Volunteer from "../models/Volunteer.js"

const getVolunteers = async (req, res) => {
    try {
        const volunteers = await Volunteer.find({})
        res.status(200).json(volunteers)
        console.log(e.message)
        res.status(400).json({ error: e.message })
    } catch(e) {
        console.log(e.message)
        res.status(400).json({ error: e.message })
    }
}

const createVolunteer = async (req, res) => {
    try {
        console.log(req.body);
        const volunteer = await Volunteer.create(req.body)
        res.status(200).json(volunteer)
    } catch(e) {
        console.log(e.message)
        res.status(400).json({ error: e.message })
    }
}


const deleteVolunteer = async (req, res) => {
    try {
        const response = await Volunteer.findByIdAndDelete(req.params.id)
        console.log(response)
        res.status(200).json(response)
    } catch(e) {
        console.log(e)
        res.status(400).json({ error: e.message })
    }
}

// const updateVolunteer = async (req, res) => {
//     try {
//         const todo = await Volunteer.findById(req.params.id)
//         todo.completed = !todo.completed
//         await todo.save()
//         res.status(200).json(todo)
//     } catch(e) {
//         console.log(e)
//         res.status(400).json({ error: e.message })
//     }
// }

export default {
    createVolunteer,
    getVolunteers,
    deleteVolunteer
}
