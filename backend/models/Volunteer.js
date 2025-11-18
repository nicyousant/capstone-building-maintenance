import mongoose from "mongoose";

const volunteerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    skills: [ 
        { 
            text: { type: String, required: true }
         }
        ],
})

// first argument is the name of the model
// if you haven't provided a name of the collection already, it will be named by the first argument + s (tasks)
// second argument is the name of the schema
// if you've already created the collection, specify the name as the third argument. 
const Volunteer = mongoose.model('volunteer', volunteerSchema, 'volunteers')

export default Volunteer