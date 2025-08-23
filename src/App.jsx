import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import WorkoutForm from './components/workoutForm'


function App() {
  const [count, setCount] = useState(0)

  return (
    <main style={{ padding: 24, maxWidth: 720, margin: "0 auto", fontFamily: "system-ui, sans-serif" }}>
      <h1>Workout Tracker</h1>
      <WorkoutForm />
    </main>
  )
}

export default App
