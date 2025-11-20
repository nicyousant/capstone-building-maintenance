import Volunteer from "../models/Volunteer.js";

const volunteers = [
    {
        name: "John Plumber",
        email: "jplumber@email.com",
        phone: "724-111-1111",
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
        phone: "724-111-2222",
        skills: [
            {text: "painting"},
            {text: "landscaping"},
            {text: "general cleaning"}
        ]
    },
            {
        name: "Mike Carpenter",
        email: "mcarpenter@email.com",
        phone: "412-111-3333",
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