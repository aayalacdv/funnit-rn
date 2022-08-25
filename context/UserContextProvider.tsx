import React, { useState } from 'react'
import { UserContext, UserType } from './user-context'


const UserContextProvider: React.FC<{children : any}> = ({children}) => {
    const [user, setUser] = useState<UserType>({
        uid: '',
        email: '',
        emailVerified: false,
        isLoggedIn: false
    })

    const updateUser = (newUser: UserType) => setUser(newUser)

    return (
        <UserContext.Provider value={{ user: user, updateUser: updateUser }}>
            {children}
        </UserContext.Provider>
    )
}


export default UserContextProvider