import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { db } from "../firebase";

function getLocalDateString() {
    const date = new Date();
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date.toISOString().slice(0,10);
}

export default function WorkoutForm() {
    const { register, handleSubmit, reset, formState: { isSubmitting, errors} } = useForm({
        defaultValues: {
            date: getLocalDateString(),
            exercise: "",
            sets: 3,
            reps: 10,
            weightKg: 0,
            notes: ""
        },
    }
)
    const [submitError, setSubmitError] = useState(null)
    const [submitSuccess, setSubmitSuccess] = useState(false)
      

    async function onSubmit(values) {
try {
    await addDoc(collection(db, "workouts"), {
        date: values.date,
        exercise: values.exercise.trim(),
        sets: values.sets,
        reps: values.reps,
        weightKg: Number.isFinite(values.weightKg) ? values.weightKg : 0,
        notes: values.notes.trim(),
        createdAt: serverTimestamp(),
    });
    
    reset({ ...values, exercise: "", notes: ""});
    setSubmitSuccess(true)
    setSubmitError(null)
} catch (error) {
    console.error("ERROR:", error)
    setSubmitError("Failed to add workout. Please try again.")
    setSubmitSuccess(false)
    
}
    }

        
    return (
        <form noValidate onSubmit={handleSubmit(onSubmit)} className="grid gap-4 max-w-xl">
            {submitSuccess && (
                <div className="rounded-md border border-green-300 bg-green-50 px-3 py-2 text-sm text-green-800">
                    Workout added successfully.
                </div>
            )}
            {submitError && (
                <div className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-800">
                    {submitError}
                </div>
            )}

            <label className="block">
                <span className="block text-sm font-medium">Date</span>
                <input
                    type="date"
                    {...register("date", { required: "Date is required" })}
                    aria-invalid={!!errors.date || undefined}
                    disabled={isSubmitting}
                    className="mt-1 block w-full rounded-lg border border-gray-300 bg-white/80 p-2.5 shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800/60"
                />
                {errors.date && (
                    <small className="mt-1 block text-sm text-red-600">{errors.date.message || 'Invalid value'}</small>
                )}
            </label>

            <label className="block">
                <span className="block text-sm font-medium">Exercise</span>
                <input
                    type="text"
                    placeholder="Squat"
                    {...register("exercise", { required: "Exercise is required" })}
                    aria-invalid={!!errors.exercise || undefined}
                    disabled={isSubmitting}
                    className="mt-1 block w-full rounded-lg border border-gray-300 bg-white/80 p-2.5 shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800/60"
                />
                {errors.exercise && (
                    <small className="mt-1 block text-sm text-red-600">{errors.exercise.message || 'Invalid value'}</small>
                )}
            </label>

            <label className="block">
                <span className="block text-sm font-medium">Sets</span>
                <input
                    type="number"
                    min="1"
                    {...register("sets", { valueAsNumber: true, required: true, min: { value: 1, message: "Min 1" } })}
                    aria-invalid={!!errors.sets || undefined}
                    disabled={isSubmitting}
                    className="mt-1 block w-full rounded-lg border border-gray-300 bg-white/80 p-2.5 shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800/60"
                />
                {errors.sets && (
                    <small className="mt-1 block text-sm text-red-600">{errors.sets.message || 'Invalid value'}</small>
                )}
            </label>

            <label className="block">
                <span className="block text-sm font-medium">Reps</span>
                <input
                    type="number"
                    min="1"
                    {...register("reps", { valueAsNumber: true, required: true, min: { value: 1, message: "Min 1" } })}
                    aria-invalid={!!errors.reps || undefined}
                    disabled={isSubmitting}
                    className="mt-1 block w-full rounded-lg border border-gray-300 bg-white/80 p-2.5 shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800/60"
                />
                {errors.reps && (
                    <small className="mt-1 block text-sm text-red-600">{errors.reps.message || 'Invalid value'}</small>
                )}
            </label>

            <label className="block">
                <span className="block text-sm font-medium">Weight (kg)</span>
                <input
                    type="number"
                    min="0"
                    step="0.5"
                    {...register("weightKg", { valueAsNumber: true, min: { value: 0, message: "Min 0" } })}
                    aria-invalid={!!errors.weightKg || undefined}
                    disabled={isSubmitting}
                    className="mt-1 block w-full rounded-lg border border-gray-300 bg-white/80 p-2.5 shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800/60"
                />
                {errors.weightKg && (
                    <small className="mt-1 block text-sm text-red-600">{errors.weightKg.message || 'Invalid value'}</small>
                )}
            </label>

            <label className="block">
                <span className="block text-sm font-medium">Notes</span>
                <textarea
                    rows={3}
                    placeholder="RPE 7, felt good"
                    {...register("notes")}
                    disabled={isSubmitting}
                    className="mt-1 block w-full rounded-lg border border-gray-300 bg-white/80 p-2.5 shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800/60"
                />
            </label>

            <div className="pt-2">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                    {isSubmitting ? "Adding..." : "Add Workout"}
                </button>
            </div>
        </form>
    )
}
