// Import useState and useEffect from React to store state
// and run side-effects when the component loads.
import { useState, useEffect } from "react";

// Import the Zustand store, which gives access to tasks, volunteers,
// and functions for fetching and updating them.
import { useTaskStore } from "../store/useTaskStore";


// Import the React-Select dropdown component.
// This also required an npm install 
import Select from "react-select";

export default function Schedule() {

  // Pull needed values and actions from the Zustand store.
  // tasks = array of task objects
  // volunteers = array of volunteer objects
  // fetchTasks = loads tasks from backend
  // fetchVolunteers = loads volunteers from backend
  // updateTask = saves an updated task to backend
  const { tasks, volunteers, fetchTasks, fetchVolunteers, updateTask } = useTaskStore();

// This local state will store each task’s chosen assignments:
  // { taskId: { leadVolunteer: {value,label}, additionalVolunteers: [...], workDate
  const [taskAssignments, setTaskAssignments] = useState({});

  // When the page first loads, fetch tasks and volunteers.
  // The dependency array contains fetchTasks & fetchVolunteers
  // so React only reruns this if those function references change.
  useEffect(() => {
    fetchTasks();
    fetchVolunteers();
  }, [fetchTasks, fetchVolunteers]);

 // Once tasks & volunteers are loaded, initialize the assignment state.
  useEffect(() => {

     // If nothing is loaded yet, stop.
    if (tasks.length === 0 || volunteers.length === 0) return;

    // Convert volunteers to dropdown options for React-Select.
    const volunteerOptions = volunteers.map(v => ({
      value: v._id.toString(), // select expects string values
      label: v.name
    }));

    const initialAssignments = {};

      // For each task, create an assignment object.
    tasks.forEach(task => {

      // Find the volunteer that matches the task's leadVolunteer field.
      const lead = volunteerOptions.find(v => v.value === task.leadVolunteer) || null;

      // Filter volunteers to match the task’s list of additionalVolunteers.
      const additional = volunteerOptions.filter(v =>
        task.additionalVolunteers?.includes(v.value)
      );

      // Save the assignment into the new object, keyed by task._id.
      initialAssignments[task._id] = {
        leadVolunteer: lead,
        additionalVolunteers: additional,
        workDate: task.workDate ? task.workDate.slice(0, 10) : ""
      };
    });

      // Store the whole structure in state.
    setTaskAssignments(initialAssignments);

    // Run this again anytime tasks OR volunteers change.
  }, [tasks, volunteers]);

  // Save assignments for a specific task to the database.
  async function handleSave(taskId) {

     // Grab the assignment object from state.
    const a = taskAssignments[taskId];
    if (!a) return;  // if missing, stop.

      // Find the original task in the list.
    const originalTask = tasks.find(t => t._id === taskId);
    if (!originalTask) return;

    // Build the update payload object.
    const updated = {
      ...originalTask, // keep unchanged fields
      leadVolunteer: a.leadVolunteer ? a.leadVolunteer.value : null, // convert select to string
      additionalVolunteers: a.additionalVolunteers.map(v => v.value), // array of string IDs
      workDate: a.workDate || null,  // send null if empty
    };

    // Send update to the database
    await updateTask(updated);

    //Notify user.
    alert(`Task "${originalTask.title}" updated!`);
  }

    // Create volunteer dropdown options
  const volunteerOptions = volunteers.map(v => ({
    value: v._id.toString(),
    label: v.name
  }));

  // Filter tasks so only those with due dates in the future appear.
  // Then sort them by due date (soonest first).
  const upcomingTasks = tasks
    .filter(t => t.dueDate && new Date(t.dueDate) >= new Date())
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  return (
    <div>
      <h2>Schedule Tasks</h2>

      {upcomingTasks.map(task => (
        <div key={task._id} className="scheduleTask" >

          <h3>{task.title}</h3>
          <p><strong>Due: </strong>{task.dueDate?.slice(0, 10) || "-"}</p>

      
         <p> <label><strong>Work Date: </strong></label>
          <input className="workDate"
            type="date"
            value={taskAssignments[task._id]?.workDate || ""}
            onChange={(e) =>

               // Update only the workDate inside this specific task’s entry.
              setTaskAssignments({
                ...taskAssignments,
                [task._id]: {
                  ...taskAssignments[task._id],
                  workDate: e.target.value
                }
              })
            }
        
          /></p>

          <p><label>Lead Volunteer</label></p>
          <Select
            className="volunteerSelect"
            options={volunteerOptions}
            value={taskAssignments[task._id]?.leadVolunteer || null}
            onChange={val =>

              // Update just the leadVolunteer field for this task.
              setTaskAssignments({
                ...taskAssignments,
                [task._id]: {
                  ...taskAssignments[task._id],
                  leadVolunteer: val
                }
              })
            }
            //React-Select prop which allows user to remove selection
            isClearable
          />

          <p><label>Additional Volunteers</label></p>
          <Select
            className="volunteerSelect"
            options={volunteerOptions}
            value={taskAssignments[task._id]?.additionalVolunteers || []}
            onChange={val =>

              // Update additional volunteers for this task.
              setTaskAssignments({
                ...taskAssignments,
                [task._id]: {
                  ...taskAssignments[task._id],
                  additionalVolunteers: val
                }
              })
            }
            //React-Select prop which allows selecting multiple volunteers
            isMulti
          />

          <button style={{ marginTop: "10px" }} className="saveBtn" onClick={() => handleSave(task._id)}>
            Save Assignment
          </button>
        </div>
      ))}
    </div>
  );
}
