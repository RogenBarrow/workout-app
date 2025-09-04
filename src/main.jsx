import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Dev-only helper to seed Firestore from the browser console
if (import.meta.env.DEV) {
  import('./seed').then((mod) => {
    // Call from DevTools: window.seedExercises()
    // Or pass additional items: window.seedExercises([{ name: 'Zercher Squat', group: 'Legs' }])
    window.seedExercises = async (extra) => {
      const count = await mod.seedExercises(Array.isArray(extra) && extra.length ? extra : undefined)
      console.log(`Seeded ${count} exercises`)
      return count
    }
  }).catch((err) => {
    console.error('Failed to load seeder:', err)
  })
}
