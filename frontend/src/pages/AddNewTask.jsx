import { useState } from "react";
import { useTaskStore } from "../store/useTaskStore.js";

export default function AddNewTask() {
  const { addTask } = useTaskStore(); // Zustand action
  const [title, setTitle] = useState("");
  const [frequency, setFrequency] = useState("");
  const [lastCompleted, setLastCompleted] = useState(""); // YYYY-MM-DD
  const [dueDate, setDueDate] = useState(""); // YYYY-MM-DD
  const [instructions, setInstructions] = useState([""]); // array of steps
  const [error, setError] = useState(null);
  const [imgURL, setImgURL] = useState("");

  // Add new instruction step
  function addStep() {
    setInstructions([...instructions, ""]);
  }

  // Update instruction text
  function handleStepChange(index, value) {
    const newInstructions = [...instructions];
    newInstructions[index] = value;
    setInstructions(newInstructions);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const newTask = {
        title,
        frequency,
        lastCompleted: lastCompleted ? new Date(lastCompleted) : null,
        dueDate: dueDate ? new Date(dueDate) : null,
        instructions: instructions
          .filter((text) => text.trim() !== "")
          .map((text) => ({ text })),
      };

      await addTask(newTask);

      // Clear form
      setTitle("");
      setFrequency("");
      setLastCompleted("");
      setDueDate("");
      setInstructions([""]);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <h2>Add New Task</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="editTask">
      <form onSubmit={handleSubmit}>
        <p>
           <label><strong>Title: </strong></label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </p>

        <p>
          <label><strong>Frequency: </strong></label>
          <input
            type="text"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            required
          />
        </p>

        <p>
          <label><strong>Last Completed: </strong></label>
          <input
            type="date"
            value={lastCompleted}
            onChange={(e) => setLastCompleted(e.target.value)}
          />
        </p>

        <p>
      <label><strong>Due Date: </strong></label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </p>
<p>
        <label>
  <strong>Image URL</strong> (optional):
  <input
    type="text"
    value={imgURL}
    onChange={(e) => setImgURL(e.target.value)}
    placeholder="image.jpg"
  />
</label>
</p>

        <div className="addNewInstructions">
          <h3>Instructions:</h3>
          {instructions.map((step, i) => (
            <div><textarea className="instructionsInput"
              key={i}
              value={step}
              onChange={(e) => handleStepChange(i, e.target.value)}
              required
            /></div>
          ))}
          <button type="button" className="addBtn" onClick={addStep}>
            Add Step
          </button>
        </div>

        <button type="submit" className="saveBtn">Save Task</button>
      </form> </div>
    </div>
  );
}
