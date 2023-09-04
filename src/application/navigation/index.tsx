import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from "@react-navigation/native"

import { VetCasesScreenHOC } from "../screens/VetCasesScreen"
import { SplashScreenHOC } from "../screens/SplashScreen"
import { LoginScreenHOC } from "../screens/LoginScreen"

export type RootStackParamList = {
    SplashScreen: undefined
    SignIn: undefined
    Profile: undefined
    VetCases: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const screenOptions = {
    contentStyle: { backgroundColor: '#FFFFFF' },
    headerShown: false,
}

export function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={screenOptions}
                initialRouteName="SplashScreen"
            >
                <Stack.Screen name={"SplashScreen"} component={SplashScreenHOC} />
                <Stack.Screen name={"SignIn"} component={LoginScreenHOC} />
                <Stack.Screen name={"VetCases"} component={VetCasesScreenHOC} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}