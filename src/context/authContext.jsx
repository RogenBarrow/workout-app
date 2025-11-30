import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import { auth, googleProvider } from '../firebase'
const AuthContext = createContext(null)
export function AuthProvider({ children }) {
    const [user, setUser] = useState(undefined)
    const [isLoading, setIsLoading] = useState(true)
    const [authError, setAuthError] = useState(null)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (firebaseUser) => {
                setUser(firebaseUser)
                setAuthError(null)
                setIsLoading(false)
            },
            (error) => {
                console.error('Unable to determine auth state', error)
                setAuthError(error)
                setUser(null)
                setIsLoading(false)
            }
        )
        return unsubscribe
    }, [])
    async function signIn() {
        try {
            setAuthError(null)
            await signInWithPopup(auth, googleProvider)
        } catch (error) {
            console.error('Sign-in failed', error)
            setAuthError(error)
            throw error
        }
    }
    async function logOut() {
        try {
            await signOut(auth)
        } catch (error) {
            console.error('Sign-out failed', error)
            setAuthError(error)
            throw error
        }
    }
    const value = useMemo(
        () => ({
            user,
            isLoading,
            authError,
            signIn,
            logOut,
        }),
        [user, isLoading, authError]
    )
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
export function useAuth() {
    const context = useContext(AuthContext)
    if (context == null) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
