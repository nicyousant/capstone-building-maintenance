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
  if (skills[skills.length - 1].text.trim() === "") return;
  setSkills((prev) => [...prev, { text: "" }]);
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

    <div className="volunteerCard">
    <form onSubmit={handleSubmit} >  




     <p> <label><strong>Name: </strong></label>
      <input
        type="text"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      /></p>

    <p>  <label><strong>Phone: </strong></label>
      <input
        type="text"
        required
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      /></p>

<p><label><strong>Email: </strong></label>
      <input
        type="text"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /></p>

      <h3>Skills</h3>
      {skills.map((skill, index) => (
        <div key={index} style={{marginBottom: "5px"}}>
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
      <button style={{width: "150px"}}
        type="button"
        onClick={addSkill}
        disabled={skills[skills.length - 1].text.trim() === ""} 
     className={
    skills[skills.length - 1].text.trim() === ""
      ? "disabledBtn"
      : "addBtn"}
      >
        Add Skill
      </button>

      <br /><br />

      <button type="submit" className="addBtn">Add Volunteer</button>
    </form> </div>
    </>
  );
}