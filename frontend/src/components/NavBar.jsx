import { useState } from "react";
import { Link } from "react-router";

export default function NavBar() {

    return (
        <>
            <nav className="nav" >
                <Link to="/">
                    <div className="navItem">Home</div>
                </Link>
                
                
              <Link to="/tasks">
                    <div className="navItem">Task Cards</div>
                </Link>
              <Link to="/volunteers">
                    <div className="navItem">Volunteers</div>
                </Link>
                    <Link to="/addtask">
                    <div className="navItem">Add New Task</div>
                </Link>
                <Link to="/addvolunteer">
                    <div className="navItem">Add New Volunteer</div>
                </Link>
                   <Link to="/safety">
                    <div className="navItem">Safety</div>
                </Link>
             
                <Link to="/schedule">
  <div className="navItem">Schedule</div>
</Link>
            </nav>

   
        </>
    );
}
