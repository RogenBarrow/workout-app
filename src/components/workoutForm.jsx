import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useForm } from "react-hook-form";

export default function WorkoutForm() {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            date: new Date().toISOString().slice(0, 10),
            exercise: "",
            sets: 3,
            reps: 10,
            weightKg: 0,
            notes: ""
        },
    })


async function onSubmit(values) {
    const sets = Number(values.sets);
    const reps = Number(values.reps);
    const weightKg = Number(values.weightKg);

    await addDoc(collection(db, "workouts"), {
        date: values.date,
        exercise: values.exercise.trim(),
        sets,
        reps,
        weightKg,
        notes: values.notes.trim(),
        createdAt: serverTimestamp(),
    });
    
    reset({ ...values, exercise: "", notes: ""});


return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: "grid", gap: 8, maxWidth: 420 }}>
        <label>
            Date
            <input type="date" {...register("date")} required />
        </label>

        <label>
            Excercise
            <input type="text" {...register("exercise")} placeholder="Squat" required />
        </label>

        <label>
            Sets
            <input type="number" min="1" {...register("reps")} required />
        </label>

        <label>
            Weight (kg)
            <input type="number" min="0" step="0.5" {...register("weightKg")} />
        </label>

        <label>
            Notes
            <textarea rows={3} {...register("notes")} placeholder="RPE 7, felt good" ></textarea>
        </label>

        <button type="submit">Add Workout</button>
    </form>
)
}};