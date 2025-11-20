import { useEffect } from 'react'
import { useTaskStore } from './store/useTaskStore';
 
import { Routes, Route, Navigate} from "react-router";
import DisplayTasks from './components/DisplayTasks'
import DisplayVolunteers from './components/DisplayVolunteers';
import AddNewTask from './pages/AddNewTask';
import NavBar from './components/NavBar';
import AddNewVolunteer from './pages/AddNewVolunteer';


function App() {

  // use useEffect to make a request to our API
  // array is dependency list. Leave empty since we only want it to run one time. 
  // use fetch to make the request
  // useEffect(() => {
  //   async function getTasks() {
  //     const response = await fetch('http://localhost:8080/tasks') 
  //     const result = await response.json()
  //     console.log(result)
  //   }
  //   getTasks()
  // }, [] )

  const fetchTasks = useTaskStore((state) => state.fetchTasks);

  useEffect(() => {
    fetchTasks(); // Load tasks from Zustand store
  }, [fetchTasks]);

  return (
    <>
    <NavBar />
      <h1>Building Maintenance</h1>
      {/* <DisplayTasks />
      <DisplayVolunteers /> */}

        <Routes>

                {/* Within the element, you render html or another component */}
                
              <Route path="/tasks" element={<div className="container"><h1>Display All Tasks</h1><DisplayTasks /></div>} />

                              <Route path="/volunteers" element={<div className="container"><h1>Display All Volunteers</h1><DisplayVolunteers /></div>} />

              <Route path="/addtask" element={<div className="container"><h1>Add New Task</h1><AddNewTask /></div>} />

                            <Route path="/addvolunteer" element={<div className="container"><h1>Add New Volunteer</h1><AddNewVolunteer /></div>} />

                         
              <Route path="*" element={<Navigate to='/' />} />
            </Routes>
      
    </>
  )
}

export default App
