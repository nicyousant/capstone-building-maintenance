import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTaskStore } from "../store/useTaskStore";

export default function EditTask() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { tasks, updateTask } = useTaskStore();

    const task = tasks.find((t) => t._id === id);

    const [title, setTitle] = useState("");
    const [frequency, setFrequency] = useState("");
    const [lastCompleted, setLastCompleted] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [instructions, setInstructions] = useState([]);
    const [imgURL, setImgURL] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        if (task) {
            setTitle(task.title || "");
            setFrequency(task.frequency || "");
            setLastCompleted(
                task.lastCompleted ? task.lastCompleted.slice(0, 10) : ""
            );
            setDueDate(task.dueDate ? task.dueDate.slice(0, 10) : "");
            setInstructions(task.instructions.map((i) => i.text) || []);
            setImgURL(task.imgURL || "");
        }
    }, [task]);

    if (!task) return <p>Task not found.</p>;

    function handleInstructionChange(index, value) {
        const updated = [...instructions];
        updated[index] = value;
        setInstructions(updated);
    }

    function addInstruction() {
        setInstructions([...instructions, ""]);
    }

    function removeInstruction(index) {
        setInstructions(instructions.filter((_, i) => i !== index));
    }

    async function handleSave(e) {
        e.preventDefault();
        try {
            const updated = {
                _id: task._id, // essential
                title,
                frequency,
                lastCompleted: lastCompleted || null,
                dueDate: dueDate || null,
                instructions: instructions
                    .filter((text) => text.trim() !== "")
                    .map((text) => ({ text })),
                imgURL,
            };

            await updateTask(updated);
            navigate(`/tasks/${task._id}`); // back to task details
        } catch (e) {
            setError(e.message);
        }
    }

    return (
        <div>
            <h2>Edit Task</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}

             {task.imgURL && <p><img src={`/${task.imgURL}`} className="taskImage" alt={task.title} /></p>}

            <form onSubmit={handleSave} className="editTask">
                <p>
                    <label>Title:</label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </p>

                <p>
                    <label>Frequency:</label>
                    <input
                        value={frequency}
                        onChange={(e) => setFrequency(e.target.value)}
                        required
                    />
                </p>

                <p>
                    <label>Last Completed:</label>
                    <input
                        type="date"
                        value={lastCompleted}
                        onChange={(e) => setLastCompleted(e.target.value)}
                    />
                </p>

                <p>
                    <label>Due Date:</label>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                </p>

                <label>Image URL:</label>
                <input
                    value={imgURL}
                    onChange={(e) => setImgURL(e.target.value)}
                />

                <h3>Instructions</h3>
                {instructions.map((inst, i) => (
                    <div
                        key={i}
                        style={{ display: "flex", marginBottom: "5px" }}
                    >
                        <textarea
                            className="instructionsInput"
                            value={inst}
                            onChange={(e) =>
                                handleInstructionChange(i, e.target.value)
                            }
                            onInput={(e) => {
                                e.target.style.height = "auto";
                                e.target.style.height =
                                    e.target.scrollHeight + "px";
                            }}
                        />
                        <button
                            type="button"
                            onClick={() => removeInstruction(i)}
                        >
                            ✕
                        </button>
                    </div>
                ))}
                <button type="button" onClick={addInstruction}>
                    Add Step
                </button>

                <br />
                <br />
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
}
