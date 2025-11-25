import { useEffect } from 'react';
import { useTaskStore } from '../store/useTaskStore';
import { Link } from "react-router";


export default function DisplayVolunteers() {
    const { volunteers, loadingVolunteers, volunteerError, fetchVolunteers } = useTaskStore();

    useEffect(() => {
        fetchVolunteers();
    }, [fetchVolunteers]);

    if (loadingVolunteers) return <p>Loading volunteers...</p>;
    if (volunteerError) return <p>Error: {volunteerError}</p>;

    return (
        <div>
        <h2>Display All Volunteers</h2>
        <div className="displayCards">
       

            {volunteers.length === 0 && <p>No volunteers found.</p>}

            {volunteers.map((volunteer) => (
                                <Link key={volunteer._id} to={`/volunteers/${volunteer._id}`} style={{ textDecoration: "none" }}>
                <div key={volunteer._id} className="taskCard">
                    {/* <p><img src={task.imgURL} className="taskImage"/></p> */}
                    <p><strong>Name:</strong> {volunteer.name}</p>
                    <p><strong>Email:</strong> {volunteer.email}</p>
                   <p><strong>Phone:</strong> {volunteer.phone}</p>

                    <p className="skills">
                            <strong>Skills:</strong>{" "}
                            {volunteer.skills && volunteer.skills.length > 0 
                                ? volunteer.skills.map((skill) => (
                                    <p key={skill._id} className="skillList">{skill.text}</p>
                                  ))
                                : "No skills listed"
                            }
                        </p>
                </div>
                </Link>
            ))}
        </div>
        </div>
    )
}