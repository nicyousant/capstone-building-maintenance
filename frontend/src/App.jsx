import { useEffect } from 'react'

function App() {

  // use useEffect to make a request to our API
  // array is dependency list. Leave empty since we only want it to run one time. 
  // use fetch to make the request
  useEffect(() => {
    async function getTasks() {
      const response = await fetch('http://localhost:8080/tasks') 
      const result = await response.json()
      console.log(result)
    }
    getTasks()
  }, [] )

  return (
    <>
      <h1>Building Maintenance</h1>
    </>
  )
}

export default App
