import WorkoutForm from './components/workoutForm'
import BottomNav from './components/BottomNav'
import { useState } from 'react'
import Dashboard from './components/dashboard'

function App() {
  const [tab, setTab] = useState("workout")

  return (
    <main className="h-screen flex flex-col bg-slate-100">
      <section className='h-32 w-full bg-gradient-to-br from-teal-700 to-emerald-600'>
        <h1 className='flex justify-center mt-5 font-bold text-5xl text-white'>{tab}</h1>
      </section>

      {/* <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-br from-teal-700 to-emerald-600" /> */}
      <section className="w-full flex-1 rounded-t-3xl bg-slate-50 shadow-xl ring-1 ring-black/5 p-6 sm:p-8 overflow-y-auto -mt-10">
        {tab === "workout" && <WorkoutForm />}
        {tab === "dashboard" && <Dashboard />}
        {tab === "user" && <div className="text-gray-700">User profile (coming soon)</div>}
      </section>

      <section classname="h-24 w-full flex">

      <BottomNav current={tab} onChange={setTab} />
      </section>
    </main>
  )
}

export default App
