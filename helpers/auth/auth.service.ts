import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User, sendEmailVerification, updateProfile, UserCredential } from "firebase/auth";
import { AutServiceType } from "./types/service-type";


export const AuthService = (auth: Auth): AutServiceType => {

    const authenticateWithEmailAndPassword = async (email: string, password: string): Promise<UserCredential | undefined> => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        if (!userCredential)
            return undefined
        return userCredential
    }

    const signUpWithPasswordAndEmail = async (email: string, password: string): Promise<UserCredential | undefined> => {
        const newUser = await createUserWithEmailAndPassword(auth, email, password)
        sendEmailVerification(newUser.user)
            .then(() => console.log('email sent'))

        if (!newUser)
            return undefined

        return newUser

    }

    const signUserOut = async (): Promise<void> => {
        await signOut(auth)
    }


    const updateUserProfile = async (displayName?: string, profilePicture?: string): Promise<void> => {

        if (!auth.currentUser) {
            return undefined
        }

        await updateProfile(auth.currentUser, { displayName: displayName, photoURL: profilePicture })
            .then(() => {
                console.log('profile updated!', auth.currentUser)
            })
            .catch((error) => {
                console.log('error', error)
            })

    }


    const onAuthStateChange = async (onUserLoggedIn: (user: User) => void, onUserDeauth: () => void) => {
        await onAuthStateChanged(auth, (user) => {
            if (user) {
                if (!user.emailVerified) {
                    alert('please verify email')
                    return
                }
                onUserLoggedIn(user)
                return
            }
            onUserDeauth()
            return

        })
    }


    return {
        authenticateWithEmailAndPassword,
        signUpWithPasswordAndEmail,
        onAuthStateChange,
        updateUserProfile,
        signUserOut
    }
}
