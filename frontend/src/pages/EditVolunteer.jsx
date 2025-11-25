import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTaskStore } from "../store/useTaskStore";

export default function EditVolunteer() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { volunteers, updateVolunteer } = useTaskStore();

    const volunteer = volunteers.find((v) => v._id === id);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [skills, setSkills] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (volunteer) {
            setName(volunteer.name || "");
            setEmail(volunteer.email || "");
            setPhone(volunteer.phone || "");
            setSkills(volunteer.skills.map((i) => i.text) || []);
        }
    }, [volunteer]);

    if (!volunteer) return <p>Volunteer not found.</p>;

    function handleSkillChange(index, value) {
        const updated = [...skills];
        updated[index] = value;
        setSkills(updated);
    }

    function addSkill() {
        setSkills([...skills, ""]);
    }

    function removeSkill(index) {
        setSkills(skills.filter((_, i) => i !== index));
    }

    async function handleSave(e) {
        e.preventDefault();
        try {
            const updated = {
                _id: volunteer._id, // essential
                name,
                email,
                phone,
                skills: skills
                    .filter((text) => text.trim() !== "")
                    .map((text) => ({ text })),
            };

            await updateVolunteer(updated);
            navigate(`/volunteers/${volunteer._id}`); // back to volunteer details
        } catch (e) {
            setError(e.message);
        }
    }

    return (
        <div>
            <h2>Edit Volunteer</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleSave} className="volunteerCard">
                <p>
                    <label><strong>Name: </strong></label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </p>

                <p>
                    <label><strong>Email: </strong></label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </p>

                        <p>
                    <label><strong>Phone: </strong></label>
                    <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </p>

               

                <h3>Skills</h3>
                {skills.map((skill, i) => (
                    <div
                        key={i}
                        className="editInstructions"
                    >
                        <input type="text"
                            className="instructionsInput"
                            value={skill}
                            onChange={(e) =>
                                handleSkillChange(i, e.target.value)
                            }
                            // onInput={(e) => {
                            //     e.target.style.height = "auto";
                            //     e.target.style.height =
                            //         e.target.scrollHeight + "px";
                            // }}
                        />
                        <button
                            type="button"
                            onClick={() => removeSkill(i)}
                        >
                            ✕
                        </button>
                    </div>
                ))}
                <button type="button" className="addBtn" onClick={addSkill}>
                    Add Skill
                </button>

                <br />
                <br />
                <button type="submit" className="saveBtn">Save Changes</button>
            </form>
        </div>
    );
}
