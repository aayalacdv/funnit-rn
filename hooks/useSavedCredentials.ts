import { AuthService } from "../helpers/auth/auth.service";
import { auth } from "../firebase/config";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/user-context";
import AsyncStorage from '@react-native-async-storage/async-storage';

const authService = AuthService(auth)

export const useSavedCredentials = () => {
    const [appIsReady, setAppIsReady] = useState(false);
    const userData = useContext(UserContext)

    useEffect(() => {
        async function prepare() {
            try {
                const credentials = await AsyncStorage.getItem('@credentials').then((item: any) => JSON.parse(item))
                if (credentials != null) {
                    const userCredentials = await authService.authenticateWithEmailAndPassword(credentials.email, credentials.password)

                    if (userCredentials != undefined) {
                        userData.isLoggedIn = true
                    }
                }
            } catch (e) {
                console.warn(e);
            }
            finally {
                setAppIsReady(true)
            }
        }

        prepare();
    }, []);

    return appIsReady;
}