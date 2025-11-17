import { useEffect } from 'react'

function App() {

  // use useEffect to make a request to our API
  // array is dependency list. Leave empty since we only want it to run one time. 
  // use fetch to make the request
  useEffect(() => {
    async function test() {
      const response = await fetch('http://localhost:8080') 
      const result = await response.json()
      console.log(result)
    }
    test()
  }, [] )

  return (
    <>

    </>
  )
}

export default App
