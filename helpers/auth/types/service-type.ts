import { User } from "firebase/auth"

export type AutServiceType = {
    authenticateWithEmailAndPassword(email: string, password: string): Promise<void | undefined>
    signUpWithPasswordAndEmail(email: string, password: string): Promise<void | undefined>
    onAuthStateChange ( onUserLoggedIn: (user: User) => void, onUserDeauth: () => void) : Promise<void>
    updateUserProfile (displayName?: string, profilePicture?: string) :  Promise<void>
    signUserOut(): Promise<void>
}