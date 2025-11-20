import { useState } from "react";
import { useTaskStore } from "../store/useTaskStore.js";

export default function AddNewVolunteer() {
  const addVolunteer = useTaskStore((s) => s.addVolunteer);


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");


  const [skills, setSkills] = useState([{ text: "" }]);

  function handleSkillChange(index, value) {
    const updated = [...skills];
    updated[index].text = value;
    setSkills(updated);
  }

  function addSkill() {
    // prevent adding a new skill until the last one is filled
    if (skills[skills.length - 1].text.trim() === "") return;
    setSkills([{ text: "" }]);
  }

  function removeSkill(index) {
    const updated = skills.filter((_, i) => i !== index);
    setSkills(updated);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Filter out any empty skills 
    const cleanedSkills = skills.filter((skill) => skill.text.trim() !== "");

    const newVolunteer = {
      name,
      phone,
      email,
      skills: cleanedSkills || null,
    };

    await addVolunteer(newVolunteer);

    // reset form after submit
    setName("");
    setPhone("");
    setEmail("");
    setSkills([{ text: "" }]);
  }

  return (
<>
    <h2>Add New Volunteer</h2>
    <form onSubmit={handleSubmit}>




      <label>Name:</label>
      <input
        type="text"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />


      <label>Phone:</label>
      <input
        type="text"
        required
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

<label>Email</label>
      <input
        type="text"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <h3>Skills</h3>
      {skills.map((skill, index) => (
        <div key={index} style={{ display: "flex", marginBottom: "5px" }}>
          <input
            type="text"
            placeholder={`Enter your skill`}
            value={skill.text}
            required
            onChange={(e) => handleSkillChange(index, e.target.value)}
          />

          {/* show remove button except on first skill */}
          {skills.length > 1 && (
            <button
              type="button"
              onClick={() => removeSkill(index)}
              style={{ marginLeft: "5px" }}
            >
              ✕
            </button>
          )}
        </div>
      ))}

      {/* Add skill */}
      <button
        type="button"
        onClick={addSkill}
        disabled={skills[skills.length - 1].text.trim() === ""}
      >
        Add Skill
      </button>

      <br /><br />

      <button type="submit">Add Volunteer</button>
    </form>
    </>
  );
}