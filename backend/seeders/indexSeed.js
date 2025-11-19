import { db } from "../db.js"
import { seedTasks } from "./tasksSeed.js";
import { seedVolunteers } from "./volunteerSeed.js";



// this file runs the functions to seed the tasks and volunteers.
// added to package.json under "scripts" 
// "seed": "node seeders/indexSeed.js"
async function runAllSeeds() {
  try {
    console.log("Seeding database");
    await seedTasks();
    await seedVolunteers();
    console.log("All seeding completed successfully!");
  } catch (error) {
    console.error("Error during seeding:", error);
  } finally {
    await db.connection.close();
    console.log("MongoDB connection closed.");
  }
}

runAllSeeds();