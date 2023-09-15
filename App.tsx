import "react-native-gesture-handler"
import React, { useEffect } from "react"
import * as SplashScreen from "expo-splash-screen"
import { ThemeProvider } from "styled-components/native"
import { useFonts, Inter_700Bold, Inter_500Medium, Inter_400Regular } from "@expo-google-fonts/inter"

import THEME from "./src/theme"
import { API } from "./src/services/axios"
import Route from "./src/routes/index.routes"
import { ChatProvider } from "./src/context/ChatContext"
import { VetCaseProvider } from "./src/context/VetCaseContext"
import { VetCasesProvider } from "./src/context/VetCasesContext"
import { useNetworkInterceptor } from "./src/services/interceptors"
import { httpClient } from "./src/infra/adapters/http-client-adapter"
import { SessionProvider, useSession } from "./src/context/UserContext"
import { NotificationProvider } from "./src/context/NotificationContext"
import { VetCaseIndicatorsProvider } from "./src/context/VetCaseIndicators"
import { ErrorsFeedbackProvider } from "./src/context/ErrorsFeedbackContext"

SplashScreen.preventAutoHideAsync()

function App() {
    const deviceSession = useSession()
    const { onRequest, onResponse } = useNetworkInterceptor()
    const [isFontsLoaded] = useFonts({ Inter_700Bold, Inter_500Medium, Inter_400Regular })

    useEffect(() => {
        httpClient.configRequestIntercept(onRequest.onSuccess)
        httpClient.configResponseIntercept(onResponse.onSuccessResponse, onResponse.onErrorResponse)

        API.interceptors.request.use(onRequest.onSuccess)
        API.interceptors.response.use(onResponse.onSuccessResponse, onResponse.onErrorResponse)
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

export default () => (
    <VetCaseIndicatorsProvider>
        <ErrorsFeedbackProvider>
            <NotificationProvider>
                <SessionProvider>
                    <App />
                </SessionProvider>
            </NotificationProvider>
        </ErrorsFeedbackProvider>
    </VetCaseIndicatorsProvider>
)