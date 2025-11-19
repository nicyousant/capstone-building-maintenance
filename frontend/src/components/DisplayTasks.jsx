import { useEffect } from 'react';
import { useTaskStore } from '../store/useTaskStore';

export default function DisplayTasks() {
    const { tasks, loading, error, fetchTasks } = useTaskStore();

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    if (loading) return <p>Loading tasks...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Task Cards</h2>

            {tasks.length === 0 && <p>No tasks found.</p>}

            {tasks.map((task) => (
                <div key={task._id}>
                    <p><img src={task.imgURL}/></p>
                    <p>{task.title}</p>
                </div>
            ))}
        </div>
    )
}