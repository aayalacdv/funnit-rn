import { useCallback, useContext, useEffect, useState } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import MainScreen from "./MainScreen";
import OptionsScreen from "./options-screen/OptionsScreen";
import LoginScreen from "./login-screen/LoginScreen";
import SignUpScreen from "./SignUpScreen";
import { UserContext } from "../context/user-context";
import MapScreen from "./map-screen/MapScreen";
import ActivityItemListScreen from "./item-list-screen/ActivityItemListScreen";
import ActivityDetailsScreen from "./activity-details-screen/activity-details-screen";
import { useSavedCredentials } from "../hooks/useSavedCredentials";
import * as SplashScreen from 'expo-splash-screen';
import React from "react";

const Stack = createNativeStackNavigator()

export const NavigationSetup = () => {
    const userData = useContext(UserContext)

    const hasCredentials = useSavedCredentials()

    const onLayoutRootView = useCallback(async () => {
      if (hasCredentials) {
        await SplashScreen.hideAsync();
      }
    }, [hasCredentials]);
    
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {
                    userData.isLoggedIn ? 
                        <>
                            <Stack.Screen name='Main' component={MainScreen} options={{ headerShown: false }} />
                            <Stack.Screen name='Options' component={OptionsScreen} options={{ headerShown: false }} />
                            <Stack.Screen name='Map' component={MapScreen} options={{ headerShown: true}} />
                            <Stack.Screen name='Items' component={ActivityItemListScreen} options={{ headerShown: false}} />
                            <Stack.Screen name='ActivityDetails' component={ActivityDetailsScreen} options={{ headerShown: false}} />
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