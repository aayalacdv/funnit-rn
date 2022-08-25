import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';
import UserContextProvider from './context/UserContextProvider';
import LoginScreen from './screens/login-screen/LoginScreen';
import MainScreen from './screens/MainScreen';
import SignUpScreen from './screens/SignUpScreen';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NativeBaseProvider>
      <UserContextProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Main'>
            <Stack.Screen name='Main' component={MainScreen} />
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='SignUp' component={SignUpScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </UserContextProvider>

    </NativeBaseProvider>
  );
}