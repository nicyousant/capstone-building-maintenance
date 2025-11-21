import { useEffect } from "react";
import { useTaskStore } from "./store/useTaskStore";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import DisplayTasks from "./pages/DisplayTasks";
import DisplayVolunteers from "./pages/DisplayVolunteers";
import AddNewTask from "./pages/AddNewTask";
import AddNewVolunteer from "./pages/AddNewVolunteer";
import TaskDetails from "./pages/TaskDetails";
import EditTask from "./pages/EditTask";
import VolunteerDetails from "./pages/VolunteerDetails";
import EditVolunteer from "./pages/EditVolunteer";

function App() {
  const fetchTasks = useTaskStore((state) => state.fetchTasks);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <>
      <NavBar />
      <h1>Building Maintenance</h1>

      <Routes>
        {/* Display all tasks */}
        <Route
          path="/tasks"
          element={
            <div className="container">
              <DisplayTasks />
            </div>
          }
        />

        {/* Task details (view-only) */}
        <Route path="/tasks/:id" element={<TaskDetails />} />

        {/* Edit task */}
        <Route path="/tasks/:id/edit" element={<EditTask />} />

        {/* Volunteers */}
        <Route path="/volunteers" element={<div className="container">  <DisplayVolunteers /></div>}/>

              {/* Volunteer details (view-only) */}
        <Route path="/volunteers/:id" element={<VolunteerDetails />} />

              {/* Edit volunteer */}
        <Route path="/volunteers/:id/edit" element={<EditVolunteer />} />

        {/* Add new task */}
        <Route
          path="/addtask"
          element={
            <div className="container">
              <AddNewTask />
            </div>
          }
        />

        {/* Add new volunteer */}
        <Route
          path="/addvolunteer"
          element={
            <div className="container">
              <AddNewVolunteer />
            </div>
          }
        />

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/tasks" />} />
      </Routes>
    </>
  );
}

export default App;
