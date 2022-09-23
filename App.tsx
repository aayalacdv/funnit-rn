import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';
import UserContextProvider from './context/UserContextProvider';
import LoginScreen from './screens/login-screen/LoginScreen';
import MainScreen from './screens/MainScreen';
import SignUpScreen from './screens/SignUpScreen';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';
import { AuthService } from './helpers/auth/auth.service';
import { auth } from './firebase/config';

const Stack = createNativeStackNavigator()
const authService = AuthService(auth)




export default function App() {

  const [appIsReady, setAppIsReady] = useState(false);
  const [authenticated, setAuthenticated] = useState<boolean>(false)

  useEffect(() => {
    async function prepare() {
      let userCredentials = undefined
      try {
        // await AsyncStorage.setItem('@credentials', '')
        const credentials = await AsyncStorage.getItem('@credentials').then((item: any) => JSON.parse(item))
        if (credentials != null) {
          userCredentials = await authService.authenticateWithEmailAndPassword(credentials.email, credentials.password)
          console.log('userCredentials', auth.currentUser)
          if (userCredentials != undefined) {
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
    <NativeBaseProvider>
      <UserContextProvider>
        <NavigationContainer>
          <Stack.Navigator>
            {
              auth.currentUser != null ?
                <>
                  <Stack.Screen name='Main' component={MainScreen} options={{ headerShown: false }} />

                </>
                :
                <>
                  <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
                  <Stack.Screen name='SignUp' component={SignUpScreen} options={{ headerShown: false }} />
                  <Stack.Screen name='Main' component={MainScreen} />
                </>
            }
          </Stack.Navigator>
        </NavigationContainer>
      </UserContextProvider>
    </NativeBaseProvider>
  );


}

