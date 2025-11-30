import {
    collection,
    limit,
    onSnapshot,
    orderBy,
    query,
} from 'firebase/firestore'
import { useEffect } from 'react'
import { useState } from 'react'
import { db } from '../firebase'

function formatDate(iso) {
    try {
        return new Date(iso).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        })
    } catch (error) {
        console.error('INFO:', error)
    }
}

export default function Dashboard() {
    const [loadError, setLoadError] = useState(null)
    const [items, setItems] = useState(null)

    useEffect(() => {
        const queryCollection = query(
            collection(db, 'workouts'),
            orderBy('date', 'desc'),
            limit(50)
        )
        const unsub = onSnapshot(
            queryCollection,
            (snap) => {
                setItems(
                    snap.docs.map((mapped) => ({
                        id: mapped.id,
                        ...mapped.data(),
                    }))
                )
                setLoadError(null)
            },
            (error) => {
                console.error('Unable to load workouts:', error)
                setLoadError('Unable to load workouts. Please try again.')
                setItems([])
            }
        )
        return unsub
    }, [])

    if (items === null)
        return (
            <div className="space-y-2">
                {loadError && (
                    <p className="text-sm text-red-600">{loadError}</p>
                )}
                <p className="text-sm text-gray-500">Loading workouts...</p>
            </div>
        )
    if (items.length === 0) {
        return (
            <div className="text-center text-gray-700">
                <p className="mb-1">No workouts yet</p>
            </div>
        )
    }
    return (
        <div className="space-y-4">
            <h2 className="flex justify-center text-lg font-semibold text-gray-900">
                Recent Workout
            </h2>
            <ul className="divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white">
                {items.map((data) => {
                    const meta = [
                        data.sets != null && data.reps != null
                            ? `${data.sets}×${data.reps}`
                            : null,
                        (data.weightKg ?? 0) > 0 ? `${data.weightKg} kg` : null,
                    ]
                        .filter(Boolean)
                        .join(' . ')
                    return (
                        <li key={data.id} className="px-4 py-3">
                            <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                    <div className="font-medium text-gray-900">
                                        {data.exercise || 'Exercise'}
                                    </div>
                                    {meta && (
                                        <div className="text-sm text-gray-600">
                                            {meta}
                                        </div>
                                    )}
                                    {data.notes && (
                                        <p className="mt-1 text-sm text-gray-700">
                                            {data.notes}
                                        </p>
                                    )}
                                </div>
                                <div className="shrink-0 text-xs text-gray-500">
                                    {formatDate(data.date)}
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
