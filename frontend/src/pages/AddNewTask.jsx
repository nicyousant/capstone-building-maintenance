import { useState } from "react";
import { useTaskStore } from "../store/useTaskStore.js";

export default function AddNewTask() {
  const addTask = useTaskStore((s) => s.addTask);

  const [imgURL, setImgURL] = useState("");
  const [title, setTitle] = useState("");
  const [frequency, setFrequency] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [lastCompleted, setLastCompleted] = useState("");

  const [instructions, setInstructions] = useState([{ text: "" }]);

  function handleStepChange(index, value) {
    const updated = [...instructions];
    updated[index].text = value;
    setInstructions(updated);
  }

  function addStep() {
    // prevent adding a new step until the last one is filled
    if (instructions[instructions.length - 1].text.trim() === "") return;
    setInstructions([...instructions, { text: "" }]);
  }

  function removeStep(index) {
    const updated = instructions.filter((_, i) => i !== index);
    setInstructions(updated);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Filter out any empty steps (don’t send blank instruction objects)
    const cleanedSteps = instructions.filter((step) => step.text.trim() !== "");

    const newTask = {
      imgURL,
      title,
      frequency,
      dueDate: dueDate || null,
      lastCompleted: lastCompleted || null,
      instructions: cleanedSteps,
    };

    await addTask(newTask);

    // OPTIONAL: reset form after submit
    setImgURL("");
    setTitle("");
    setFrequency("");
    setDueDate("");
    setLastCompleted("");
    setInstructions([{ text: "" }]);
  }

  return (
    <form onSubmit={handleSubmit}>



      <label>Image URL:</label>
      <input
        type="text"
        value={imgURL}
        onChange={(e) => setImgURL(e.target.value)}
      />


      <label>Title:</label>
      <input
        type="text"
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />


      <label>Frequency:</label>
      <input
        type="text"
        required
        value={frequency}
        onChange={(e) => setFrequency(e.target.value)}
      />


      <label>Due Date:</label>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />


      <label>Last Completed:</label>
      <input
        type="date"
        value={lastCompleted}
        onChange={(e) => setLastCompleted(e.target.value)}
      />


      <h3>Instructions</h3>
      {instructions.map((step, index) => (
        <div key={index} style={{ display: "flex", marginBottom: "5px" }}>
          <input
            type="text"
            placeholder={`Step ${index + 1}`}
            value={step.text}
            required
            onChange={(e) => handleStepChange(index, e.target.value)}
          />

          {/* show remove button except on step 1 */}
          {instructions.length > 1 && (
            <button
              type="button"
              onClick={() => removeStep(index)}
              style={{ marginLeft: "5px" }}
            >
              ✕
            </button>
          )}
        </div>
      ))}

      {/* Add step */}
      <button
        type="button"
        onClick={addStep}
        disabled={instructions[instructions.length - 1].text.trim() === ""}
      >
        Add Step
      </button>

      <br /><br />

      <button type="submit">Create Task</button>
    </form>
  );
}