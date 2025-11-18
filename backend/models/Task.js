import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    text: { type: String, required: true},
    completed: { type: Boolean, default: false }
})

// first argument is the name of the model
// if you haven't provided a name of the collection already, it will be named by the first argument + s (tasks)
// second argument is the name of the schema
// if you've already created the collection, specify the name as the third argument. 
const Task = mongoose.model('task', taskSchema)

export default Task