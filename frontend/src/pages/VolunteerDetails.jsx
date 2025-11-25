import { useTaskStore } from "../store/useTaskStore";
import { useParams, useNavigate } from "react-router-dom";

export default function VolunteerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { volunteers, deleteVolunteer } = useTaskStore();

  const volunteer = volunteers.find((v) => v._id === id);

  if (!volunteer) return <p>Volunteer not found.</p>;

    async function handleDelete() {
    if (window.confirm("Are you sure you want to delete this volunteer?")) {
      try {
        await deleteVolunteer(volunteer._id);
        navigate("/volunteers"); // navigate back to volunteer list
      } catch (e) {
        console.error(e.message);
      }
    }
}

  return (
    <div>
      <h2>Volunteer Details</h2>

      <div className="volunteerCard">
       
        <p><strong>Name:</strong> {volunteer.name}</p>
        <p><strong>Email:</strong> {volunteer.email}</p>
<p><strong>Phone:</strong> {volunteer.phone}</p>

        <h3>Skills:</h3>
        {volunteer.skills.length > 0 ? (
          <div >
            {volunteer.skills.map((skill, i) => (
              <p key={i} className="skillList">{skill.text}</p>
            ))}
          </div>
        ) : (
          <p>No skills.</p>
        )}
      </div>

      <button 
        className="editVolBtn"
        onClick={() => navigate(`/volunteers/${volunteer._id}/edit`)}
      >
        Edit Volunteer
      </button>

            <button
        className="deleteVolBtn"
        onClick={handleDelete}
      >
       {/* <img src="/delete_bl.svg" style={{width: "12px"}}/>  */}
       Delete Volunteer
      </button>
    </div>

    
  );
}
