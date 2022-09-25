import { createContext } from 'react'


export type UserContextType = {
    uid: string,
    email: string,
    emailVerified: boolean,
    isLoggedIn: boolean
    updateUser: (prop : any) => void
}


export const UserContext = createContext<UserContextType>({
    uid: '',
    email: '',
    isLoggedIn: false,
    emailVerified: false,
    updateUser: (prop: any) => console.log('')
})








