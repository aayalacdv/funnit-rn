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
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    async function prepare() {
      try {
        const credentials = await AsyncStorage.getItem('@credentials').then((item: any) => JSON.parse(item))
        const userCredentials = await authService.authenticateWithEmailAndPassword(credentials.email, credentials.password)
        if (userCredentials){
          setAuthenticated(true)
          setAppIsReady(true);
        } 
      } catch (e) {
        console.warn(e);
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
          <Stack.Navigator initialRouteName={authenticated ? 'Login' : 'Main'}>
            <Stack.Screen name='Main' component={MainScreen} />
            <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name='SignUp' component={SignUpScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </UserContextProvider>

    </NativeBaseProvider>
  );
}