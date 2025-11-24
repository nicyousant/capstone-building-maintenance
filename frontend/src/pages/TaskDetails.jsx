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

        <p><strong>Title:</strong> {task.title}</p>
        <p><strong>Frequency:</strong> {task.frequency}</p>
        <p><strong>Last Completed:</strong> {task.lastCompleted ? task.lastCompleted.slice(0,10) : "-"}</p>
        <p><strong>Due Date:</strong> {task.dueDate ? task.dueDate.slice(0,10) : "-"}</p>
        <p><strong>Work Date:</strong> {task.workDate ? task.workDate.slice(0,10) : "-"}</p>

        <h3>Instructions:</h3>
        {task.instructions.length > 0 ? (
          <ul>
            {task.instructions.map((inst, i) => (
              <li key={i}>{inst.text}</li>
            ))}
          </ul>
        ) : (
          <p>No instructions.</p>
        )}

        <h3>Lead Volunteer:</h3>
        <p>{leadVolunteerName}</p>

        <h3>Additional Volunteers:</h3>
        {additionalNames.length > 0 ? (
          <ul>
            {additionalNames.map((name, i) => (
              <li key={i}>{name}</li>
            ))}
          </ul>
        ) : (
          <p>None assigned</p>
        )}
      </div>

      <button
        style={{ marginTop: "20px" }}
        onClick={() => navigate(`/tasks/${task._id}/edit`)}
      >
        Edit Task
      </button>

      {/* DELETE BUTTON */}
      <button
     
        onClick={handleDelete}
      >
        Delete Task
      </button>
    </div>
  );
}
