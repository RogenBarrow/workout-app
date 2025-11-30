import WorkoutForm from './components/workoutForm'
import BottomNav from './components/BottomNav'
import { useState } from 'react'
import Dashboard from './components/dashboard'
import { useAuth } from './context/AuthContext.jsx'

function App() {
    const [tab, setTab] = useState('workout')
    const { user, isLoading, signIn, logOut } = useAuth()

    if (isLoading) {
        return (
            <main className="h-screen flex items-center justify-center">
                Checking session…
            </main>
        )
    }
    if (!user) {
        return (
            <main className="h-screen flex flex-col items-center justify-center gap-6 bg-slate-100">
                <h1 className="text-3xl font-semibold text-gray-900">
                    Workout Tracker
                </h1>
                <button
                    onClick={signIn}
                    className="rounded-xl bg-teal-600 px-6 py-3 text-white font-semibold"
                >
                    Sign in to view your workouts
                </button>
            </main>
        )
    }

    return (
        <main className="h-screen flex flex-col bg-slate-100">
            <section className="h-32 w-full bg-gradient-to-br from-teal-700 to-emerald-600">
                <header className="flex items-center justify-between px-6 py-4 bg-gradient-to-br from-teal-700 to-emerald-600">
                    <h1 className="text-3xl font-bold text-white capitalize">
                        {tab}
                    </h1>
                    <button
                        onClick={logOut}
                        className="rounded-lg bg-white/15 px-3 py-1 text-sm text-white hover:bg-white/25"
                    >
                        Log out
                    </button>
                </header>
            </section>

            {/* <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-br from-teal-700 to-emerald-600" /> */}
            <section className="w-full flex-1 rounded-t-3xl bg-slate-50 shadow-xl ring-1 ring-black/5 p-6 sm:p-8 overflow-y-auto -mt-10">
                {tab === 'workout' && <WorkoutForm />}
                {tab === 'dashboard' && <Dashboard />}
                {tab === 'user' && (
                    <div className="text-gray-700">
                        User profile (coming soon)
                    </div>
                )}
            </section>

            <section classname="h-24 w-full flex">
                <BottomNav current={tab} onChange={setTab} />
            </section>
        </main>
    )
}

export default App
