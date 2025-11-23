import { useState, useEffect } from "react";
import { useTaskStore } from "../store/useTaskStore";
import Select from "react-select";

export default function Schedule() {
  const { tasks, volunteers, fetchTasks, fetchVolunteers, updateTask } = useTaskStore();

  // This will hold a mapping of taskId -> { leadVolunteer, additionalVolunteers }
  const [taskAssignments, setTaskAssignments] = useState({});

  // fetch tasks and volunteers on load
  useEffect(() => {
    fetchTasks();
    fetchVolunteers();
  }, [fetchTasks, fetchVolunteers]);

  // Initialize taskAssignments once tasks and volunteers are loaded
  useEffect(() => {
    if (tasks.length === 0 || volunteers.length === 0) return;

    const volunteerOptions = volunteers.map(v => ({ value: v._id.toString(), label: v.name }));

    const initialAssignments = {};
    tasks.forEach(task => {
      const leadId = task.leadVolunteer ? task.leadVolunteer.toString() : null;
      const lead = volunteerOptions.find(v => v.value === leadId) || null;

      const additionalIds = task.additionalVolunteers.map(v => v.toString());
      const additional = volunteerOptions.filter(v => additionalIds.includes(v.value));

      initialAssignments[task._id] = {
        leadVolunteer: lead,
        additionalVolunteers: additional
      };
    });

    setTaskAssignments(initialAssignments);
  }, [tasks, volunteers]);

  // Save a task's assignment
  async function handleSave(taskId) {
    const assignment = taskAssignments[taskId];
    if (!assignment) return;

    const task = tasks.find(t => t._id === taskId);
    if (!task) return;

    const updated = {
      ...task,
      leadVolunteer: assignment.leadVolunteer ? assignment.leadVolunteer.value : null,
      additionalVolunteers: assignment.additionalVolunteers.map(v => v.value)
    };

    await updateTask(updated);
    alert(`Task "${task.title}" updated!`);
  }

  const volunteerOptions = volunteers.map(v => ({ value: v._id.toString(), label: v.name }));

  // upcoming tasks
  const upcomingTasks = tasks.filter(t => t.dueDate && new Date(t.dueDate) >= new Date());

  return (
    <div>
      <h2>Schedule Tasks</h2>
      {upcomingTasks.length === 0 && <p>No upcoming tasks.</p>}

      {upcomingTasks.map(task => (
        <div key={task._id} className="taskCard" style={{ marginBottom: "20px" }}>
          <p><strong>{task.title}</strong></p>
          <p>Due: {task.dueDate ? task.dueDate.slice(0, 10) : "-"}</p>

          <label>Lead Volunteer</label>
          <Select
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
            isClearable
          />

          <label style={{ marginTop: "10px" }}>Additional Volunteers</label>
          <Select
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
