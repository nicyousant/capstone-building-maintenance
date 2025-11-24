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
        name: "Jenny Plumber",
        email: "jennyplumber@email.com",
        phone: "724-111-1122",
        skills: [
            {text: "plumbing"},
            {text: "HVAC"},
            {text: "electrical"},
            {text: "general cleaning"},
            {text: "painting"}
        ]
    },

     {
        name: "Mark Plumber",
        email: "markplumber@email.com",
        phone: "724-111-3322",
        skills: [
            {text: "plumbing"},
            {text: "HVAC"},
            {text: "electrical"},
            {text: "general cleaning"}
        ]
    },

     {
        name: "Susan Plumber",
        email: "sueplumber@email.com",
        phone: "724-111-9922",
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
        name: "Tony Painter",
        email: "tpainter@email.com",
        phone: "724-111-2244",
        skills: [
            {text: "painting"},
            {text: "landscaping"},
               {text: "electrical"},
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

     {
        name: "Betty Carpenter",
        email: "bcarpenter@email.com",
        phone: "412-111-3355",
        skills: [
            {text: "carpentry"},
            {text: "roofing"},
            {text: "general cleaning"},
            {text: "landscaping"}
        ]
    },
         {
        name: "Jeremy Carpenter",
        email: "jcarpenter@email.com",
        phone: "412-111-3399",
        skills: [
            {text: "carpentry"},
            {text: "roofing"},
            {text: "general cleaning"},
            {text: "landscaping"},
             {text: "painting"}
        ]
    },

    {
        name: "Emily Plant",
        email: "emilyplant@email.com",
        phone: "412-111-3300",
        skills: [
            {text: "roofing"},
            {text: "general cleaning"},
            {text: "landscaping"},
             {text: "painting"}
        ]
    },

        {
        name: "Tim Plant",
        email: "timplant@email.com",
        phone: "412-217-3300",
        skills: [
            {text: "roofing"},
            {text: "general cleaning"},
            {text: "landscaping"},
             {text: "painting"}
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