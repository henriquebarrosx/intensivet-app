import React from "react"
import "react-native-gesture-handler"
import * as SplashScreen from "expo-splash-screen"
import { Routes } from "./src/application/navigation"
import { withCustomFonts } from "./src/application/shared/react-hooks/withCustomFonts"

SplashScreen.preventAutoHideAsync()

const App = () => <Routes />
const AppHOC = withCustomFonts(App)

export default AppHOC