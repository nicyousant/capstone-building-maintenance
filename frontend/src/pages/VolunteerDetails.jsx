import { useTaskStore } from "../store/useTaskStore";
import { useParams, useNavigate } from "react-router-dom";

export default function VolunteerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { volunteers } = useTaskStore();

  const volunteer = volunteers.find((v) => v._id === id);

  if (!volunteer) return <p>Volunteer not found.</p>;

  return (
    <div>
      <h2>Volunteer Details</h2>

      <div className="taskCard">
        {/* {task.imgURL && <p><img src={`/${task.imgURL}`} className="taskImage" alt={task.title} /></p>} */}
        <p><strong>Name:</strong> {volunteer.name}</p>
        <p><strong>Email:</strong> {volunteer.email}</p>
<p><strong>Phone:</strong> {volunteer.phone}</p>

        <h3>Skills:</h3>
        {volunteer.skills.length > 0 ? (
          <ul >
            {volunteer.skills.map((skill, i) => (
              <li key={i} className="instructions">{skill.text}</li>
            ))}
          </ul>
        ) : (
          <p>No skills.</p>
        )}
      </div>

      <button
        style={{ marginTop: "20px" }}
        onClick={() => navigate(`/volunteers/${volunteer._id}/edit`)}
      >
        Edit Volunteer
      </button>
    </div>
  );
}
