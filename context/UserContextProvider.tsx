import React, { useState } from 'react'
import { UserContext} from './user-context'


const UserContextProvider: React.FC<{children : any}> = ({children}) => {
    const [user, setUser] = useState({
        uid: '',
        email: '',
        emailVerified: false,
        isLoggedIn: false
    })

    const updateUser = (loggedIn: boolean) => setUser((prev) => {
        return {
            ...prev, 
            isLoggedIn: loggedIn
        }
    })

    return (
        <UserContext.Provider value={{  ...user , updateUser: updateUser }}>
            {children}
        </UserContext.Provider>
    )
}


export default UserContextProvider