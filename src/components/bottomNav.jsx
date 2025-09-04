export default function BottomNav({ current = "workout", onChange}) {
    const is = (id) => current === id ? "text-teal-600" : "text-gray-500 hover:text-teal-600"

    const Item = ({ id, label, children}) => (
        <button type="button"
        onClick={() => onChange?.(id)}
        aria-current={current === id ? "page" : undefined}
        className={`group flex flex-col items-center justify-center gap-1 px-3 py-2 text-xs font-medium ${is(id)}`}
        >
            <span className="h-6 w-6">{children}</span>
            <span>{label}</span>
        </button>
    )

    return (
        <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/70">
            <div className="mx-auto flex h-16 max-w-xl items-stretch justify-around px-2">
                <Item id="dashboard" label="Dashboard">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-6 w-6">
                        <path strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                          d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5z" />
                      </svg>
                </Item>
                   
                <button type="button"
                onClick={() => onChange?.("workout")}
                aria-current={current === "workout" ? "page" : undefined}
                className="-mt-6 flex h-12 w-12 items-center justify-center rounded-full bg-teal-600 text-white shadow-lg ring-4 ring-white transition hover:bg-teal-500 active:bg-teal-700"
                >
                    {/* plus icon */}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-6 w-6">
                        <path strokeWidth="2" strokeLinecap="round" d="M12 5v14M5 12h14" />
                      </svg>
                      <span className="sr-only">Workout</span>   
                </button>

                <Item id="user" label="User">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-6 w-6">
                        <path strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                          d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm7 8a7 7 0 0 0-14 0" />
                      </svg>
                </Item>
            </div>
            <div className="h-[env(safe-area-inset-bottom)]" />
        </nav>
    )
}