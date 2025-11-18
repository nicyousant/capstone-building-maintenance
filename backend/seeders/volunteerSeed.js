import Volunteer from "../models/Volunteer.js";

const volunteers = [
    {
        name: "John Plumber",
        email: "jplumber@email.com",
        skills: [
            {text: "plumbing"},
            {text: "HVAC"},
            {text: "electrical"},
            {text: "general cleaning"}
        ]
    },
        {
        name: "Missy Painter",
        email: "mpainter@email.com",
        skills: [
            {text: "painting"},
            {text: "landscaping"},
            {text: "general cleaning"}
        ]
    },
            {
        name: "Mike Carpenter",
        email: "mcarpenter@email.com",
        skills: [
            {text: "carpentry"},
            {text: "roofing"},
            {text: "general cleaning"}
        ]
    },
]

async function seedVolunteers() {
    try{
        console.log("seeding volunteer data");
        const resultDelete = await Volunteer.deleteMany({})
        const resultInsert = await Volunteer.insertMany(volunteers)
        console.log(resultDelete)
        console.log(resultInsert)
        console.log("Volunteers successfully seeded!")
    } catch (e) {
        console.log(e);
    } 
}

export { volunteers, seedVolunteers }