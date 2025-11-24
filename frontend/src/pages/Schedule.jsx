import { useState, useEffect } from "react";
import { useTaskStore } from "../store/useTaskStore";
import Select from "react-select";

export default function Schedule() {
  const { tasks, volunteers, fetchTasks, fetchVolunteers, updateTask } = useTaskStore();

  // taskId -> { leadVolunteer, additionalVolunteers, workDate }
  const [taskAssignments, setTaskAssignments] = useState({});

  // fetch tasks and volunteers when page loads
  useEffect(() => {
    fetchTasks();
    fetchVolunteers();
  }, [fetchTasks, fetchVolunteers]);

  // Initialize assignment state from tasks
  useEffect(() => {
    if (tasks.length === 0 || volunteers.length === 0) return;

    const volunteerOptions = volunteers.map(v => ({
      value: v._id.toString(),
      label: v.name
    }));

    const initialAssignments = {};
    tasks.forEach(task => {
      const lead = volunteerOptions.find(v => v.value === task.leadVolunteer) || null;

      const additional = volunteerOptions.filter(v =>
        task.additionalVolunteers?.includes(v.value)
      );

      initialAssignments[task._id] = {
        leadVolunteer: lead,
        additionalVolunteers: additional,
        workDate: task.workDate ? task.workDate.slice(0, 10) : ""
      };
    });

    setTaskAssignments(initialAssignments);
  }, [tasks, volunteers]);

  // Save assignments for a specific task
  async function handleSave(taskId) {
    const a = taskAssignments[taskId];
    if (!a) return;

    const originalTask = tasks.find(t => t._id === taskId);
    if (!originalTask) return;

    const updated = {
      ...originalTask,
      leadVolunteer: a.leadVolunteer ? a.leadVolunteer.value : null,
      additionalVolunteers: a.additionalVolunteers.map(v => v.value),
      workDate: a.workDate || null,  
    };

    await updateTask(updated);
    alert(`Task "${originalTask.title}" updated!`);
  }

  const volunteerOptions = volunteers.map(v => ({
    value: v._id.toString(),
    label: v.name
  }));

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

      
         <p> <label>Work Date: </label>
          <input className="workDate"
            type="date"
            value={taskAssignments[task._id]?.workDate || ""}
            onChange={(e) =>
              setTaskAssignments({
                ...taskAssignments,
                [task._id]: {
                  ...taskAssignments[task._id],
                  workDate: e.target.value
                }
              })
            }
        
          /></p>

          <label>Lead Volunteer</label>
          <Select
            className="volunteerSelect"
            options={volunteerOptions}
            value={taskAssignments[task._id]?.leadVolunteer || null}
            onChange={val =>
              setTaskAssignments({
                ...taskAssignments,
                [task._id]: {
                  ...taskAssignments[task._id],
                  leadVolunteer: val
                }
              })
            }
            //React-Select prop
            isClearable
          />

          <label>Additional Volunteers</label>
          <Select
            className="volunteerSelect"
            options={volunteerOptions}
            value={taskAssignments[task._id]?.additionalVolunteers || []}
            onChange={val =>
              setTaskAssignments({
                ...taskAssignments,
                [task._id]: {
                  ...taskAssignments[task._id],
                  additionalVolunteers: val
                }
              })
            }
            //React-Select prop
            isMulti
          />

          <button style={{ marginTop: "10px" }} onClick={() => handleSave(task._id)}>
            Save Assignment
          </button>
        </div>
      ))}
    </div>
  );
}
