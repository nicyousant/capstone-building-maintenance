import { useEffect } from 'react'
import DisplayTasks from './components/DisplayTasks'
import { useTaskStore } from './store/useTaskStore';
import DisplayVolunteers from './components/DisplayVolunteers';


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
      <h1>Building Maintenance</h1>
      <DisplayTasks />
      <DisplayVolunteers />
    </>
  )
}

export default App
