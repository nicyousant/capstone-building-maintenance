import { useEffect } from 'react';
import { useTaskStore } from '../store/useTaskStore';

export default function DisplayVolunteers() {
    const { volunteers, loadingVolunteers, error, fetchVolunteers } = useTaskStore();

    useEffect(() => {
        fetchVolunteers();
    }, [fetchVolunteers]);

    if (loadingVolunteers) return <p>Loading volunteers...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Volunteers</h2>
        <div className="displayCards">
       

            {volunteers.length === 0 && <p>No volunteers found.</p>}

            {volunteers.map((volunteer) => (
                <div key={volunteer._id} className="taskCard">
                    {/* <p><img src={task.imgURL} className="taskImage"/></p> */}
                    <p><strong>Name:</strong> {volunteer.name}</p>
                    <p><strong>Email:</strong> {volunteer.email}</p>
                   
                    <p className="skills">
                            <strong>Skills:</strong>{" "}
                            {volunteer.skills && volunteer.skills.length > 0 
                                ? volunteer.skills.map((skill) => (
                                    <li key={skill._id} className="skillList">{skill.text}</li>
                                  ))
                                : "No skills listed"
                            }
                        </p>
                </div>
            ))}
        </div>
        </div>
    )
}