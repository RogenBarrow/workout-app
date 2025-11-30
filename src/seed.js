import { writeBatch, doc, serverTimestamp } from 'firebase/firestore'
import { db } from './firebase'

function slugify(name) {
    return name
        .trim()
        .toLowerCase()
        .replace(/['’]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
}

// Extend this list anytime
export const EXERCISES = [
    // Legs / Posterior
    { name: 'Back Squat', group: 'Legs' },
    { name: 'Front Squat', group: 'Legs' },
    { name: 'Bulgarian Split Squat', group: 'Legs' },
    { name: 'Walking Lunge', group: 'Legs' },
    { name: 'Leg Press', group: 'Legs' },
    { name: 'Deadlift', group: 'Posterior Chain' },
    { name: 'Romanian Deadlift', group: 'Posterior Chain' },
    { name: 'Hip Thrust', group: 'Glutes' },
    { name: 'Good Morning', group: 'Posterior Chain' },
    { name: 'Calf Raise', group: 'Calves' },

    // Chest
    { name: 'Bench Press', group: 'Chest' },
    { name: 'Incline Bench Press', group: 'Chest' },
    { name: 'Dumbbell Bench Press', group: 'Chest' },
    { name: 'Push-Up', group: 'Chest' },
    { name: 'Cable Fly', group: 'Chest' },

    // Back
    { name: 'Barbell Row', group: 'Back' },
    { name: 'Dumbbell Row', group: 'Back' },
    { name: 'Pendlay Row', group: 'Back' },
    { name: 'Seated Cable Row', group: 'Back' },
    { name: 'Lat Pulldown', group: 'Back' },
    { name: 'Pull-Up', group: 'Back' },
    { name: 'Chin-Up', group: 'Back' },
    { name: 'Face Pull', group: 'Back' },

    // Shoulders
    { name: 'Overhead Press', group: 'Shoulders' },
    { name: 'Dumbbell Shoulder Press', group: 'Shoulders' },
    { name: 'Lateral Raise', group: 'Shoulders' },
    { name: 'Rear Delt Fly', group: 'Shoulders' },
    { name: 'Front Raise', group: 'Shoulders' },
    { name: 'Arnold Press', group: 'Shoulders' },

    // Arms
    { name: 'Bicep Curl', group: 'Arms' },
    { name: 'Hammer Curl', group: 'Arms' },
    { name: 'Preacher Curl', group: 'Arms' },
    { name: 'Tricep Pushdown', group: 'Arms' },
    { name: 'Skull Crushers', group: 'Arms' },
    { name: 'Dip', group: 'Arms' },

    // Core
    { name: 'Plank', group: 'Core' },
    { name: 'Crunch', group: 'Core' },
    { name: 'Hanging Leg Raise', group: 'Core' },
    { name: 'Cable Woodchop', group: 'Core' },
    { name: 'Pallof Press', group: 'Core' },

    // Conditioning
    { name: 'Rowing Machine', group: 'Conditioning' },
    { name: 'Assault Bike', group: 'Conditioning' },
    { name: 'Treadmill Run', group: 'Conditioning' },
    { name: 'SkiErg', group: 'Conditioning' },
    { name: 'Kettlebell Swing', group: 'Conditioning' },
]

export async function seedExercises(exercises = undefined) {
    // If exercises is not provided or empty, fall back to defaults
    const list =
        Array.isArray(exercises) && exercises.length > 0 ? exercises : EXERCISES

    const batch = writeBatch(db)
    const now = serverTimestamp()

    for (const item of list) {
        const id = slugify(item.name)
        batch.set(
            doc(db, 'exercises', id),
            {
                name: item.name,
                group: item.group ?? null,
                createdAt: now,
                updatedAt: now,
            },
            { merge: true }
        )
    }

    await batch.commit()
    return list.length
}
