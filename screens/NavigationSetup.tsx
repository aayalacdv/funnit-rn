import { useCallback, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthService } from "../helpers/auth/auth.service";
import { auth } from "../firebase/config";
import * as SplashScreen from 'expo-splash-screen';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import MainScreen from "./MainScreen";
import OptionsScreen from "./options-screen/OptionsScreen";
import LoginScreen from "./login-screen/LoginScreen";
import SignUpScreen from "./SignUpScreen";
import { UserContext } from "../context/user-context";

const authService = AuthService(auth)
const Stack = createNativeStackNavigator()

export const NavigationSetup = () => {
    const [appIsReady, setAppIsReady] = useState(false);
    const [authenticated, setAuthenticated] = useState<boolean>(false)
    const userData = useContext(UserContext)

    useEffect(() => {
        async function prepare() {
            let userCredentials = undefined
            try {
                // await AsyncStorage.setItem('@credentials', '')
                const credentials = await AsyncStorage.getItem('@credentials').then((item: any) => JSON.parse(item))
                if (credentials != null) {
                    userCredentials = await authService.authenticateWithEmailAndPassword(credentials.email, credentials.password)
                    if (userCredentials != undefined) {
                        userData.updateAuthStatus(true)
                        console.log(userData)
                        setAuthenticated(true)
                    }
                }


            } catch (e) {
                console.warn(e);
            }
            finally {
                if (userCredentials != undefined) {
                    setAuthenticated(true)
                }
                setAppIsReady(true)
            }
        }



        prepare();
    }, []);


    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {
                    userData.isLoggedIn ? 
                        <>
                            <Stack.Screen name='Main' component={MainScreen} options={{ headerShown: false }} />
                            <Stack.Screen name='Options' component={OptionsScreen} options={{ headerShown: false }} />
                        </>
                        :
                        <>
                            <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
                            <Stack.Screen name='SignUp' component={SignUpScreen} options={{ headerShown: false }} />
                        </>
                }
            </Stack.Navigator>
        </NavigationContainer>
    )

}


export default NavigationContainer