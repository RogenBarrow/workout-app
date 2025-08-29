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
        <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

            <div className="pt-0">
                <label className="text-base font-semibold text-gray-900">Date</label>
                <input
                    type="date"
                    {...register("date", { required: "Date is required" })}
                    aria-invalid={!!errors.date || undefined}
                    disabled={isSubmitting}
                    className="mt-2 w-full border-0 border-b border-gray-200 bg-transparent px-0 pb-2 text-gray-900 placeholder:text-gray-400 focus:border-teal-600 focus:ring-0"
                />
                {errors.date && (
                    <small className="mt-1 block text-sm text-red-600">{errors.date.message || 'Invalid value'}</small>
                )}
            </div>

            <div className="pt-6">
                <label className="text-base font-semibold text-gray-900">Exercise</label>
                <input
                    type="text"
                    placeholder="Squat"
                    {...register("exercise", { required: "Exercise is required" })}
                    aria-invalid={!!errors.exercise || undefined}
                    disabled={isSubmitting}
                    className="mt-2 w-full border-0 border-b border-gray-200 bg-transparent px-0 pb-2 text-gray-900 placeholder:text-gray-400 focus:border-teal-600 focus:ring-0"
                />
                {errors.exercise && (
                    <small className="mt-1 block text-sm text-red-600">{errors.exercise.message || 'Invalid value'}</small>
                )}
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div className="pt-6">
                    <label className="text-base font-semibold text-gray-900">Sets</label>
                    <input
                        type="number"
                        min="1"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        {...register("sets", { valueAsNumber: true, required: true, min: { value: 1, message: "Min 1" } })}
                        aria-invalid={!!errors.sets || undefined}
                        disabled={isSubmitting}
                        className="mt-2 w-full border-0 border-b border-gray-200 bg-transparent px-0 pb-2 text-gray-900 placeholder:text-gray-400 focus:border-teal-600 focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    {errors.sets && (
                        <small className="mt-1 block text-sm text-red-600">{errors.sets.message || 'Invalid value'}</small>
                    )}
                </div>

                <div className="pt-6">
                    <label className="text-base font-semibold text-gray-900">Reps</label>
                    <input
                        type="number"
                        min="1"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        {...register("reps", { valueAsNumber: true, required: true, min: { value: 1, message: "Min 1" } })}
                        aria-invalid={!!errors.reps || undefined}
                        disabled={isSubmitting}
                        className="mt-2 w-full border-0 border-b border-gray-200 bg-transparent px-0 pb-2 text-gray-900 placeholder:text-gray-400 focus:border-teal-600 focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    {errors.reps && (
                        <small className="mt-1 block text-sm text-red-600">{errors.reps.message || 'Invalid value'}</small>
                    )}
                </div>

                <div className="pt-6">
                    <label className="text-base font-semibold text-gray-900">Weight (kg)</label>
                    <input
                        type="number"
                        min="0"
                        step="0.5"
                        inputMode="decimal"
                        {...register("weightKg", { valueAsNumber: true, min: { value: 0, message: "Min 0" } })}
                        aria-invalid={!!errors.weightKg || undefined}
                        disabled={isSubmitting}
                        className="mt-2 w-full border-0 border-b border-gray-200 bg-transparent px-0 pb-2 text-gray-900 placeholder:text-gray-400 focus:border-teal-600 focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    {errors.weightKg && (
                        <small className="mt-1 block text-sm text-red-600">{errors.weightKg.message || 'Invalid value'}</small>
                    )}
                </div>
            </div>

            <div className="pt-6">
                <label className="text-base font-semibold text-gray-900">Notes</label>
                <textarea
                    rows={3}
                    placeholder="RPE 7, felt good"
                    {...register("notes")}
                    disabled={isSubmitting}
                    className="mt-2 w-full resize-y rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/30"
                />
            </div>

            <div className="pt-2">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-teal-600 px-4 font-semibold text-white shadow-sm transition hover:bg-teal-500 active:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-600/50 disabled:opacity-50"
                >
                    {isSubmitting ? "Adding..." : "Add Workout"}
                </button>
            </div>
        </form>
    )
}
