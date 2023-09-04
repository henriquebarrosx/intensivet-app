import React from "react";
import { createNativeStackNavigator, NativeStackNavigationOptions } from "@react-navigation/native-stack";

import { Login } from "../screens/Login";
import SplashScreen from "../screens/SplashScreen";

const Stack = createNativeStackNavigator();

export function PublicRoutes() {
  return (
    <Stack.Navigator initialRouteName="SplashScreen" screenOptions={screenOptions}>
      <Stack.Screen name={"SplashScreen"} component={SplashScreen} />
      <Stack.Screen name={"Login"} component={Login} />
    </Stack.Navigator>
  )
}

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  contentStyle: {  backgroundColor: '#FFF' }
}