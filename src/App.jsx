import WorkoutForm from './components/workoutForm'
import BottomNav from './components/BottomNav'
import { useState } from 'react'
import Dashboard from './components/dashboard'

function App() {
  const [tab, setTab] = useState("workout")

  return (
    <main className="relative min-h-screen bg-gray-100 flex items-start justify-center px-4 py-10 sm:py-16 font-sans pb-24">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-br from-teal-700 to-emerald-600" />
      <section className="relative z-10 w-full max-w-xl rounded-3xl bg-white shadow-xl ring-1 ring-black/5 p-6 sm:p-8">
        {tab === "workout" && <WorkoutForm />}
        {tab === "dashboard" && <Dashboard />}
        {tab === "user" && <div className="text-gray-700">User profile (coming soon)</div>}
      </section>

      <BottomNav current={tab} onChange={setTab} />
    </main>
  )
}

export default App
