import { useEffect } from 'react';
import { useTaskStore } from '../store/useTaskStore';

export default function DisplayTasks() {
    const { tasks, loadingTasks, error, fetchTasks } = useTaskStore();

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    if (loadingTasks) return <p>Loading tasks...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Task Cards</h2>
        <div className="displayCards">
       

            {tasks.length === 0 && <p>No tasks found.</p>}

            {tasks.map((task) => (
                <div key={task._id} className="taskCard">
                    <p><img src={task.imgURL} className="taskImage"/></p>
                    <p>{task.title}</p>
                    <p><strong>Frequency:</strong> {task.frequency}</p>
                    <p><strong>Last Completed:</strong> {task.lastCompleted ? new Date(task.lastCompleted).toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" }) : "-"}</p>
                    <p><strong>Due Date:</strong> {task.dueDate ? new Date(task.dueDate).toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" }) : "-"}</p>
                </div>
            ))}
        </div>
        </div>
    )
}