import { createContext } from 'react'

export type UserType = {
    uid: string,
    email: string,
    emailVerified: boolean,
    isLoggedIn: boolean 
}


export type UserContextType = {
    user: UserType,
    updateUser: (newUser: UserType) => void 
}


export const UserContext = createContext<UserContextType>({
    user: {
        uid: '', 
        email: '', 
        isLoggedIn: false,
        emailVerified: false,
    }, 
    updateUser: (newUser: UserType) => console.log('')
})








