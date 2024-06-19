'use client'

import {
    createContext,
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
    useState
} from 'react'

import { useRouter } from 'next/navigation'

import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { FormData } from '@/app/(home)/login/cliente/page'

interface AuthContextType {
    isAuthenticated: boolean
    user: any | null
    userPartner: any | null
    userSignIn: (data: FormData) => Promise<void>
    partnerSignIn: (data: FormData) => Promise<void>
    signOut: () => void
}

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any | null>(null)
    const [userPartner, setUserPartner] = useState<any | null>(null)

    const isAuthenticated = !!user
    const router = useRouter()

    useEffect(() => {
        const { 'marktech.token': token } = parseCookies()
        if (token) {
            fetch('http://localhost:3333/users/profile', {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
                .then((response) => response.json())
                .then((userData) => {
                    setUser(userData)
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error)
                })
        }
    }, [])

    async function userSignIn({ email, password_hash }: FormData) {
        try {
            const url = 'http://localhost:3333/users/login'

            const request = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password_hash })
            });

            if (!request.ok) {
                const errorResponse = await request.json()
                throw new Error(errorResponse.message)
            }

            const response = await request.json()

            setCookie(response, 'marktech.token', response.token, {
                maxAge: 60 * 60 * 1
            })
            setUser(response.user)
            router.push('/')
            return response
        } catch (error) {
            throw error
        }
    }

    async function partnerSignIn({ email, password_hash }: FormData) {
        try {
            const url = 'http://localhost:3333/partners/login'

            const request = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password_hash })
            });

            if (!request.ok) {
                const errorResponse = await request.json()
                throw new Error(errorResponse.message)
            }

            const response = await request.json()

            setCookie(response, 'marktech.token.partner', response.token, {
                maxAge: 60 * 60 * 1
            })
            setUser(response.user)
            router.push('/')
            return response
        } catch (error) {
            throw error
        }
    }

    const signOut = useCallback(() => {
        destroyCookie(null, 'marktech.token')
        destroyCookie(null, 'marktech.token.partner')
        setUser(null)
        setUserPartner(null)

        router.push('/')
        window.location.reload()
    }, [router])

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                userSignIn,
                partnerSignIn,
                signOut,
                user,
                userPartner
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
