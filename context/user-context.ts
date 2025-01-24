import { createContext } from 'react'



export type UserContextType = {
    uid: string,
    email: string,
    emailVerified: boolean,
    isLoggedIn: boolean,
    updateAuthStatus: (status: boolean) => void
}

export const UserContext = createContext<UserContextType>({
    uid: '',
    email: '',
    isLoggedIn: false,
    emailVerified: false,
    updateAuthStatus: () => false
})
