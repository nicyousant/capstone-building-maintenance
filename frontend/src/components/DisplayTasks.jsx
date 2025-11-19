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
                    <p>{task.frequency}</p>
                    <p>{task.lastCompleted}</p>
                </div>
            ))}
        </div>
        </div>
    )
}