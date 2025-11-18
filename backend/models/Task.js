import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    imgURL: { type: String },
    title: { type: String, required: true},
    instructions: [ 
        { 

            text: { type: String, required: true } 
        }
],
    lastCompleted: { type: Date },
    dueDate: { type: Date },
    frequency: { type: String, required: true}
})

// first argument is the name of the model
// if you haven't provided a name of the collection already, it will be named by the first argument + s (tasks)
// second argument is the name of the schema
// if you've already created the collection, specify the name as the third argument. 
const Task = mongoose.model('task', taskSchema)

export default Task