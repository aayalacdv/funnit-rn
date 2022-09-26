import { createContext } from 'react'


export type UserContextType = {
    uid: string,
    email: string,
    emailVerified: boolean,
    isLoggedIn: boolean
    updateAuthStatus: (prop : any) => void
}


export const UserContext = createContext<UserContextType>({
    uid: '',
    email: '',
    isLoggedIn: false,
    emailVerified: false,
    updateAuthStatus: (prop: any) => console.log('')
})








