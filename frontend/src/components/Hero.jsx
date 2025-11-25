import { Link } from "react-router";


export default function Hero() {
    return (
        <main>
            <Link to={"/tasks"}>
                {" "}
                <div className="homeCircle">
                    <img src="task.svg" />
                </div>
                <h3>View Task Cards</h3>
            </Link>
            <Link to={"/volunteers"}>
                {" "}
                <div className="homeCircle">
                    <img src="person.svg" />
                </div>
                <h3>View Volunteers</h3>
            </Link>
            <Link to={"/schedule"}>
                {" "}
                <div className="homeCircle">
                    <img src="schedule.svg" />
                </div>
                <h3>Schedule a Task</h3>
            </Link>
        </main>
    );
}
