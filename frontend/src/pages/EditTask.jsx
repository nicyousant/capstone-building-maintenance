import { useState, useEffect } from "react";
import { useTaskStore } from "../store/useTaskStore";
import { useParams, useNavigate } from "react-router-dom";
import Select from "react-select";

export default function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, volunteers, fetchVolunteers, updateTask } = useTaskStore();

  const task = tasks.find(t => t._id === id);

  // State for form fields
  const [title, setTitle] = useState("");
  const [frequency, setFrequency] = useState("");
  const [lastCompleted, setLastCompleted] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [workDate, setWorkDate] = useState("");   
  const [instructions, setInstructions] = useState([]);
  const [imgURL, setImgURL] = useState("");
  const [leadVolunteer, setLeadVolunteer] = useState(null);
  const [additionalVolunteers, setAdditionalVolunteers] = useState([]);

 useEffect(() => {
    if (volunteers.length === 0) {
      fetchVolunteers();
    }
  }, [volunteers, fetchVolunteers]);

  // Initialize form when task & volunteers load
  useEffect(() => {
    if (!task || volunteers.length === 0) return;

    setTitle(task.title);
    setFrequency(task.frequency);
    setLastCompleted(task.lastCompleted ? task.lastCompleted.slice(0,10) : "");
    setDueDate(task.dueDate ? task.dueDate.slice(0,10) : "");
    setWorkDate(task.workDate ? task.workDate.slice(0,10) : "");   
    setInstructions(task.instructions.map(inst => inst.text));
    setImgURL(task.imgURL || "");

    const volunteerOptions = volunteers.map(v => ({ value: v._id, label: v.name }));
    setLeadVolunteer(volunteerOptions.find(v => v.value === task.leadVolunteer) || null);
    setAdditionalVolunteers(
      volunteerOptions.filter(v => task.additionalVolunteers.includes(v.value))
    );
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
      workDate: workDate || null,     
      imgURL: imgURL || null,
      instructions: instructions
        .filter(text => text.trim() !== "")
        .map(text => ({ text })),
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
      <div className="editTask">
      <form onSubmit={handleSave} >

        <p>
          <label><strong>Title: </strong></label>
          <input value={title} onChange={e => setTitle(e.target.value)} required />
        </p>

        <p>
          <label><strong>Frequency: </strong></label>
          <input value={frequency} onChange={e => setFrequency(e.target.value)} required />
        </p>

        <p>
          <label><strong>Last Completed: </strong></label>
          <input type="date" value={lastCompleted} onChange={e => setLastCompleted(e.target.value)} />
        </p>

        <p>
          <label><strong>Due Date: </strong></label>
          <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
        </p>

        <p>
          <label><strong>Work Date: </strong></label> 
          <input type="date" value={workDate} onChange={e => setWorkDate(e.target.value)} />
        </p>

        <p>
          <label><strong>Image URL: </strong></label>
          <input
            type="text"
            value={imgURL}
            onChange={e => setImgURL(e.target.value)}
            placeholder="image.jpg"
          />
        </p>

        <h3>Instructions:</h3>
        {instructions.map((inst, i) => (
          <div key={i} className="editInstructions">
            <textarea
              className="instructionsInput"
              value={inst}
              onChange={e => handleInstructionChange(i, e.target.value)}
            />
            <button type="button" onClick={() => removeInstruction(i)}>✕</button>
          </div>
        ))}
        <button type="button" onClick={addInstruction} className="addBtn">Add Step</button>

        <h3>Lead Volunteer</h3>
        <Select className="volunteerSelect"
          options={volunteerOptions}
          value={leadVolunteer}
          onChange={setLeadVolunteer}
          isClearable
        />

        <h3>Additional Volunteers</h3>
        <Select className="volunteerSelect"
          options={volunteerOptions}
          value={additionalVolunteers}
          onChange={setAdditionalVolunteers}
          isMulti
        />

        <br /><br />
        <button type="submit" className="saveBtn">Save Changes</button>
      </form> </div>
    </div> 
  );
}
