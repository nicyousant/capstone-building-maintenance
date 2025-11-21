import { useTaskStore } from "../store/useTaskStore";
import { useParams, useNavigate } from "react-router-dom";

export default function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, deleteTask } = useTaskStore();

  const task = tasks.find((t) => t._id === id);

  if (!task) return <p>Task not found.</p>;

  async function handleDelete() {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(task._id);
        navigate("/tasks"); // navigate back to task list
      } catch (e) {
        console.error(e.message);
      }
    }
  }

  return (
    <div>
      <h2>Task Details</h2>

      <div className="taskCard">
        {task.imgURL && <p><img src={`/${task.imgURL}`} className="taskImage" alt={task.title} /></p>}
        <p><strong>Title:</strong> {task.title}</p>
        <p><strong>Frequency:</strong> {task.frequency}</p>
<p><strong>Last Completed:</strong> {task.lastCompleted ? new Date(task.lastCompleted).toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" }) : "-"}</p>
<p><strong>Due Date:</strong> {task.dueDate ? new Date(task.dueDate).toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" }) : "-"}</p>
        <h3>Instructions:</h3>
        {task.instructions.length > 0 ? (
          <ul >
            {task.instructions.map((inst, i) => (
              <li key={i} className="instructions">{inst.text}</li>
            ))}
          </ul>
        ) : (
          <p>No instructions.</p>
        )}
      </div>

      <button
        style={{ marginTop: "20px" }}
        onClick={() => navigate(`/tasks/${task._id}/edit`)}
      >
        Edit Task
      </button>

      <button
        style={{ marginTop: "20px", marginLeft: "10px"}}
        onClick={handleDelete}
      >
       <img src="/delete_bl.svg" style={{width: "12px"}}/> Delete Task
      </button>
    </div>
  );
}
