import { writeBatch, doc, serverTimestamp } from "firebase/firestore"
import { db } from "./firebase"

function slugify(name) {
return name
.trim()
.toLowerCase()
.replace(/['’]/g, "")
.replace(/[^a-z0-9]+/g, "-")
.replace(/^-+|-+$/g, "")
}

export async function seedExercises() {
const items = [
{ name: "Back Squat" },
{ name: "Front Squat" },
{ name: "Bench Press" },
{ name: "Incline Bench Press" },
{ name: "Overhead Press" },
{ name: "Deadlift" },
{ name: "Romanian Deadlift" },
{ name: "Barbell Row" },
{ name: "Dumbbell Row" },
{ name: "Lat Pulldown" },
{ name: "Pull-Up" },
{ name: "Seated Cable Row" },
{ name: "Bicep Curl" },
{ name: "Hammer Curl" },
{ name: "Tricep Pushdown" },
{ name: "Skull Crushers" },
{ name: "Hip Thrust" },
{ name: "Leg Press" },
{ name: "Leg Curl" },
{ name: "Leg Extension" },
{ name: "Calf Raise" },
{ name: "Plank" },
{ name: "Crunch" },
{ name: "Russian Twist" },
]

const batch = writeBatch(db)
const now = serverTimestamp()

for (const item of items) {
const id = slugify(item.name)
batch.set(
doc(db, "exercises", id),
{ name: item.name, createdAt: now, updatedAt: now },
{ merge: true }
)
}

await batch.commit()
return items.length
}