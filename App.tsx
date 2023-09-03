import React from "react"
import "react-native-gesture-handler"
import * as SplashScreen from "expo-splash-screen"
import { Routes } from "./src/application/navigation"

SplashScreen.preventAutoHideAsync()

export default function App() {
    return <Routes />
}
