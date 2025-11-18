import Volunteer from "../models/Volunteer";

const volunteers = [
    {
        name: "John Plumber",
        email: "jplumber@email.com",
        skills: [
            "plumbing",
            "HVAC",
            "electrical",
            "general cleaning"
        ]
    },
        {
        name: "Missy Painter",
        email: "mpainter@email.com",
        skills: [
            "painting",
            "landscaping",
            "general cleaning"
        ]
    },
            {
        name: "Mike Carpenter",
        email: "mcarpenter@email.com",
        skills: [
            "carpentry",
            "roofing",
            "general cleaning"
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