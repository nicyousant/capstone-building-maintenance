import { useTaskStore } from "../store/useTaskStore";
import { useParams, useNavigate } from "react-router-dom";

export default function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, volunteers, deleteTask } = useTaskStore();

  const task = tasks.find(t => t._id === id);
  if (!task) return <p>Task not found.</p>;

  const leadVolunteerName =
    volunteers.find(v => v._id === task.leadVolunteer)?.name || "-";

  const additionalNames = task.additionalVolunteers
    .map(vId => volunteers.find(v => v._id === vId)?.name)
    .filter(Boolean);

  async function handleDelete() {
    const confirmDelete = window.confirm(
      `Are you sure you want to permanently delete "${task.title}"?`
    );
    if (!confirmDelete) return;

    await deleteTask(task._id);
    navigate("/tasks");
  }

  return (
    <div>
      <h2>Task Details</h2>

      <div className="taskDetails">
        {task.imgURL && (
          <p>
            <img
              src={`/${task.imgURL}`}
              className="taskImage"
              alt={task.title}
            />
          </p>
        )}

        <h3>{task.title}</h3>
        <p><strong>Frequency:</strong> {task.frequency}</p>
        <p><strong>Last Completed:</strong> {task.lastCompleted ? task.lastCompleted.slice(0,10) : "-"}</p>
        <p><strong>Due Date:</strong> {task.dueDate ? task.dueDate.slice(0,10) : "-"}</p>
        <p><strong>Work Date:</strong> {task.workDate ? task.workDate.slice(0,10) : "-"}</p>

        <h3>Instructions:</h3>
        <div className="instructions">
        {task.instructions.length > 0 ? (
          <ul className="checkBullet">
            {task.instructions.map((inst, i) => (
              <li key={i}>{inst.text}</li>
            ))}
          </ul>
        ) : (
          <p>No instructions.</p>
        )}
</div>
        <h3>Lead Volunteer:</h3>
        <p>{leadVolunteerName}</p>

        <h3>Additional Volunteers:</h3>
        {additionalNames.length > 0 ? (
          <div>
            {additionalNames.map((name, i) => (
              <p key={i}>{name}</p>
            ))}
          </div>
        ) : (
          <p>None assigned</p>
        )}
      </div>

      <button
         className="editBtn"
        onClick={() => navigate(`/tasks/${task._id}/edit`)}
      >
        Edit Task
      </button>

      {/* DELETE BUTTON */}
      <button className="deleteBtn"
     
        onClick={handleDelete}
      >
        Delete Task
      </button>
    </div>
  );
}
