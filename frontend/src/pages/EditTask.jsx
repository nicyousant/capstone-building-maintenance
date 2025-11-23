import { useState, useEffect } from "react";
import { useTaskStore } from "../store/useTaskStore";
import { useParams, useNavigate } from "react-router-dom";
import Select from "react-select";

export default function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, volunteers, updateTask } = useTaskStore();

  const task = tasks.find(t => t._id === id);

  // State for form fields
  const [title, setTitle] = useState("");
  const [frequency, setFrequency] = useState("");
  const [lastCompleted, setLastCompleted] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [instructions, setInstructions] = useState([]);
  const [imgURL, setImgURL] = useState("");
  const [leadVolunteer, setLeadVolunteer] = useState(null);
  const [additionalVolunteers, setAdditionalVolunteers] = useState([]);

  // Initialize form when task & volunteers are loaded
  useEffect(() => {
    if (!task) return;

    setTitle(task.title);
    setFrequency(task.frequency);
    setLastCompleted(task.lastCompleted ? task.lastCompleted.slice(0,10) : "");
    setDueDate(task.dueDate ? task.dueDate.slice(0,10) : "");
    setInstructions(task.instructions.map(inst => inst.text));
    setImgURL(task.imgURL || "");

    const volunteerOptions = volunteers.map(v => ({ value: v._id, label: v.name }));
    setLeadVolunteer(volunteerOptions.find(v => v.value === task.leadVolunteer) || null);
    setAdditionalVolunteers(volunteerOptions.filter(v => task.additionalVolunteers.includes(v.value)));
  }, [task, volunteers]);

  function handleInstructionChange(index, value) {
    const newInstructions = [...instructions];
    newInstructions[index] = value;
    setInstructions(newInstructions);
  }

  function addInstruction() {
    setInstructions([...instructions, ""]);
  }

  function removeInstruction(index) {
    setInstructions(instructions.filter((_, i) => i !== index));
  }

  async function handleSave(e) {
    e.preventDefault();
    if (!task) return;

    const updated = {
      ...task,
      title,
      frequency,
      lastCompleted: lastCompleted || null,
      dueDate: dueDate || null,
      imgURL: imgURL || null,
      instructions: instructions.filter(text => text.trim() !== "").map(text => ({ text })),
      leadVolunteer: leadVolunteer ? leadVolunteer.value : null,
      additionalVolunteers: additionalVolunteers.map(v => v.value),
    };

    await updateTask(updated);
    navigate(`/tasks/${task._id}`);
  }

  const volunteerOptions = volunteers.map(v => ({ value: v._id, label: v.name }));

  return (
    <div>
      <h2>Edit Task</h2>
      <form onSubmit={handleSave}>
        <p>
          <label>Title:</label>
          <input value={title} onChange={e => setTitle(e.target.value)} required />
        </p>

        <p>
          <label>Frequency:</label>
          <input value={frequency} onChange={e => setFrequency(e.target.value)} required />
        </p>

        <p>
          <label>Last Completed:</label>
          <input type="date" value={lastCompleted} onChange={e => setLastCompleted(e.target.value)} />
        </p>

        <p>
          <label>Due Date:</label>
          <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
        </p>

        <p>
          <label>Image URL:</label>
          <input type="text" value={imgURL} onChange={e => setImgURL(e.target.value)} placeholder="image.jpg" />
        </p>

        <h3>Instructions:</h3>
        {instructions.map((inst, i) => (
          <div key={i} style={{ display: "flex", marginBottom: "5px" }}>
            <textarea
              className="instructionsInput"
              value={inst}
              onChange={e => handleInstructionChange(i, e.target.value)}
            />
            <button type="button" onClick={() => removeInstruction(i)}>✕</button>
          </div>
        ))}
        <button type="button" onClick={addInstruction}>Add Step</button>

        <h3>Lead Volunteer</h3>
        <Select
          options={volunteerOptions}
          value={leadVolunteer}
          onChange={setLeadVolunteer}
          isClearable
        />

        <h3>Additional Volunteers</h3>
        <Select
          options={volunteerOptions}
          value={additionalVolunteers}
          onChange={setAdditionalVolunteers}
          isMulti
        />

        <br /><br />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}
