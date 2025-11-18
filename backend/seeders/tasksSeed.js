import Task from "../models/Task.js";

const tasks = [
    {
        imgURL: "fall.jpg",
        title: "Fall Cleanup",
        instructions: [ 
                {text: "Check for vegetation near the buildings that needs to be trimmed back to prevent dampness from developing. "},
                {text: "Check if any roots are causing damage to paths, roads, or the building foundation."}, 
                {text: "Check the entire property for signs of soil erosion and ensure drainage channels are not being filled by natural soil movement."},
                {text: "Rake leaves and dispose of properly."},
                {text: "Remove spider webs, insect debris, and dirt from exterior of building."},
                {text: "Remove weeds and invasive plant growth."}, 
                {text: "Remove bird/animal nests from areas where damage to buildings or structures could occur."},
                {text: "Remove dead plant growth."},
                {text: "Inspect the trees for loose, rotted, or dead limbs that could fall. Verify that there are no limbs that could fall onto the roof and that the trees are trimmed back and away from the building."},
                {text: "Winterize hose bibs."},
                {text: "Drain garden hoses and store properly."},
                {text: "Clean out all eaves, gutters, and drains."},
                {text: "Apply a winter fertilizer to lawn areas. (optional)"}
        ],
        lastCompleted: "11/9/2025",
        dueDate: "11/9/2026",
        frequency: "Yearly",
    },
        {
        imgURL: "spring.jpg",
        title: "Spring Cleanup",
        instructions: [ 
                {text: "Check for vegetation near the buildings that needs to be trimmed back to prevent dampness from developing. "},
                {text: "Check if any roots are causing damage to paths, roads, or the building foundation."}, 
                {text: "Check the entire property for signs of soil erosion and ensure drainage channels are not being filled by natural soil movement."},
                {text: "Sweep driveways and paved areas."},
                {text: "Power-wash sidewalks, driveways, and paved areas, if needed."},
                {text: "Check all culverts and swales from blockage, making sure that water drains properly."},
                {text: "Make sure vegetation is not growing over sidewalks or parking areas."}, 
                {text: "Remove bird/animal nests from areas where damage to buildings or structures could occur."},
                {text: "Inspect the trees for loose, rotted, or dead limbs that could fall. Verify that there are no limbs that could fall onto the roof and that the trees are trimmed back and away from the building."}, 
                {text: "Check all exterior hose bibs."},
                {text: "Inspect any decorative landscape edging to confirm that it is in good condition."},
                {text: "Check the mulch condition: refresh annually, or as needed.  Verify that the mulch height is 4-6” below the sill plate of the building and that the grade allows for drainage away from the building."},
                {text: "Verify that bushes, hedges, or small trees are well-manicured and free of disease."},
                {text: "Repair lawn damage."},
                {text: "Apply spring fertilizer. (optional)"},
                {text: "Paint or repaint fire lane curb."},
                {text: "Clean vegetation from around A/C units."},
                {text: "Weed and landscape both upper and lower gate walls."}
        ],
        lastCompleted: "4/5/2025",
        dueDate: "4/5/2026",
        frequency: "Yearly",
    },
      {
        imgURL: "carpet.jpg",
        title: "Carpets & Mats",
        instructions: [ 
                {text: "Are entry floor mats in good condition without curled-up edges and fixed in a position so as not to slide around?"},
                {text: "Make sure that floors are even and carpets are free of wrinkles."}, 
                {text: "Inspect carpet for tears, lifting along edges, bubbling, or significant wear (especially in high-traffic areas)."},
                {text: "Remove chairs, if possible, and clean the carpets using commercial-grade carpet cleaners."},
                {text: "THOROUGHLY dry carpet with fans before re-setting chairs."},
                {text: "Ensure that all mats are sufficient in size to remove moisture/dirt from shoes."},
                {text: "Clean the mats using commercial-grade carpet cleaners."}
        ],
        lastCompleted: "11/6/2025",
        dueDate: "5/6/2026",
        frequency: "6 Months",
    },
]


async function seedTasks() {
    try{
        console.log("seeding task data");
        const resultDelete = await Task.deleteMany({})
        const resultInsert = await Task.insertMany(tasks)
        console.log(resultDelete)
        console.log(resultInsert)
        console.log("Tasks successfully seeded!")
    } catch (e) {
        console.log(e);
    } 
}

export { tasks, seedTasks }