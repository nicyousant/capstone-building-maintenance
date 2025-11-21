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
    {
        imgURL: "fence.jpg",
        title: "Fences & Gates",
        instructions: [ 
                {text: "Inspect the condition and operation of the manual gate hinges and latches to ensure they are secure and check for rust."},
                {text: "Verify that the gate lock, locking mechanism, latches, and/or hinges are functioning and lubricated properly."}, 
                {text: "Confirm that warning signs have been posted on each side of the gate. To prevent injury to passerby, a gate should open toward the property's interior in most cases."},
                {text: "Inspect the condition of the rollers. Guarding should be installed on exposed rollers."},
                {text: "Verify that the bump stop is in good condition. Stopping mechanisms should prevent the gate from falling over if it comes off the track."},
                {text: "Inspect paint finish and touch up where needed with appropriate color, sheen and paint type."},
                {text: "Inspect for holes, damage or rust on the fence and touch up as needed."},
                {text: "Ensure that vegetation/trees are not growing on or through the fence."}
        ],
        lastCompleted: "11/6/2025",
        dueDate: "11/6/2026",
        frequency: "Yearly",
    },

       {
        imgURL: "roof.jpg",
        title: "Roof, Gutters, & Downspouts ",
        instructions: [ 
                {text: "Verify that the construction is still structurally strong."},
                {text: "Verify that the wood is still in good condition."}, 
                {text: "Verify that all bolts, hardware and metal parts, including steel posts are secure and free from rust."},
                {text: "Inspect condition of the decking and roofing material."},
                {text: "Inspect condition of the paint finish and touch up if needed."},
                {text: "Clear any debris on the roof."},
                {text: "Inspect the condition of all caulking."},
                {text: "Inspect for missing or damaged shingles."},
                {text: "Inspect condition of ridge cap looking for signs of rust or corrosion in the roof flashing and on nail heads."},
                {text: "Verify that roof vents are not blocked."},
                {text: "Inspect condition of tar and sealant at all joints and roof penetrations."},
                {text: "Clean the roof to remove corrosive deposits by hosing down with water using neutral detergents."},
                {text: "Verify that gutters and downspouts are clean and free of rust, debris, damage or leaks."},
        ],
        lastCompleted: "11/6/2025",
        dueDate: "11/6/2026",
        frequency: "Yearly",
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