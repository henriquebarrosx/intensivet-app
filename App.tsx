import "react-native-gesture-handler"
import React, { useEffect } from "react"
import * as SplashScreen from "expo-splash-screen"
import { useFonts, Inter_700Bold, Inter_500Medium, Inter_400Regular } from "@expo-google-fonts/inter"

import Route from "./src/routes/index.routes"
import { injectGlobalProviders } from "./src/context"
import { useSession } from "./src/context/UserContext"
import { httpClient } from "./src/infra/adapters/http-client-adapter"
import { useNetworkInterceptor } from "./src/infra/adapters/http-client-adapter/interceptor"

SplashScreen.preventAutoHideAsync()

function App() {
    const deviceSession = useSession()
    const { onRequest, onResponse } = useNetworkInterceptor()
    const [isFontsLoaded] = useFonts({ Inter_700Bold, Inter_500Medium, Inter_400Regular })

    useEffect(() => {
        httpClient.configRequestIntercept(onRequest.onSuccess)
        httpClient.configResponseIntercept(onResponse.onSuccess, onResponse.onFailure)
    }, [])

    return isFontsLoaded
        ? <Route isAuthenticated={deviceSession.isAuthenticated} />
        : null
}

export default injectGlobalProviders(App)