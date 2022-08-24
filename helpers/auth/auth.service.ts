import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User, sendEmailVerification, updateProfile, UserCredential } from "firebase/auth";
import { AutServiceType } from "./types/service-type";


export const AuthService = (auth: Auth): AutServiceType => {

    const authenticateWithEmailAndPassword = async (email: string, password: string): Promise<void | undefined> => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        if (!userCredential)
            return undefined
    }

    const signUpWithPasswordAndEmail = async (email: string, password: string): Promise<void | undefined> => {
        const newUser = await createUserWithEmailAndPassword(auth, email, password)
        sendEmailVerification(newUser.user)

            .then(() => console.log('email sent'))

        if (!newUser)
            return undefined

        console.log(newUser.user)
    }

    const signUserOut = async (): Promise<void> => {
        await signOut(auth)
    }


    const updateUserProfile = async (displayName?: string, profilePicture?: string) : Promise<void> => {

        if(!auth.currentUser){
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
        onAuthStateChanged(auth, (user) => {
            if (user) {
                if (user.emailVerified) {
                    onUserLoggedIn(user)
                } else {
                    alert('please verify your email')
                }
            } else {
                onUserDeauth()
            }
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
