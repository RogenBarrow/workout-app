import WorkoutForm from './components/workoutForm'

function App() {
  return (
    <main className="relative min-h-screen bg-gray-100 flex items-start justify-center px-4 py-10 sm:py-16 font-sans">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-br from-teal-700 to-emerald-600" />
      <section className="relative z-10 w-full max-w-xl rounded-3xl bg-white shadow-xl ring-1 ring-black/5 p-6 sm:p-8">
        <WorkoutForm />
      </section>
    </main>
  )
}

export default App
