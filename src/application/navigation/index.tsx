import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { LoginScreenHOC } from "../screens/LoginScreen"
import { SplashScreenHOC } from "../screens/SplashScreen"
import { VetCasesScreenHOC } from "../screens/VetCasesScreen"

const Stack = createNativeStackNavigator()

const screenOptions = {
    headerShown: false,
    contentStyle: { backgroundColor: '#FFF' }
}

export function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={screenOptions}
                initialRouteName="SplashScreen"
            >
                <Stack.Screen name={"SplashScreen"} component={SplashScreenHOC} />
                <Stack.Screen name={"Login"} component={LoginScreenHOC} />
                <Stack.Screen name={"VetCases"} component={VetCasesScreenHOC} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}