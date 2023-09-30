import "react-native-gesture-handler"
import React, { useEffect } from "react"
import * as SplashScreen from "expo-splash-screen"
import { ThemeProvider } from "styled-components/native"
import { useFonts, Inter_700Bold, Inter_500Medium, Inter_400Regular } from "@expo-google-fonts/inter"

import THEME from "./src/theme"
import Route from "./src/routes/index.routes"
import { injectGlobalProviders } from "./src/context"
import { useSession } from "./src/context/UserContext"
import { ChatProvider } from "./src/context/ChatContext"
import { VetCaseProvider } from "./src/context/VetCaseContext"
import { VetCasesProvider } from "./src/context/VetCasesContext"
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

    return isFontsLoaded ? (
        <ThemeProvider theme={THEME}>
            <VetCasesProvider>
                <VetCaseProvider>
                    <ChatProvider>
                        <Route isAuthenticated={deviceSession.isAuthenticated} />
                    </ChatProvider>
                </VetCaseProvider>
            </VetCasesProvider>
        </ThemeProvider>
    ) : null
}

export default injectGlobalProviders(App)