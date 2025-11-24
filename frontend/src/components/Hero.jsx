import { Link } from "react-router";


export default function Hero() {
    return (
        <main>
            <Link to={"/tasks"}>
                {" "}
                <div className="homeCircle">
                    <img src="task.svg" />
                </div>
            </Link>
            <Link to={"/volunteers"}>
                {" "}
                <div className="homeCircle">
                    <img src="person.svg" />
                </div>
            </Link>
            <Link to={"/schedule"}>
                {" "}
                <div className="homeCircle">
                    <img src="schedule.svg" />
                </div>
            </Link>
        </main>
    );
}
