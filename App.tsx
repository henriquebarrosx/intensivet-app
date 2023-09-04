import { LogBox } from 'react-native';
import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { ThemeProvider } from 'styled-components/native';
import { useFonts, Inter_700Bold, Inter_500Medium, Inter_400Regular } from '@expo-google-fonts/inter';

import THEME from './src/theme';
import Route from './src/routes/index.routes';
import { ChatProvider } from './src/context/ChatContext';
import { VetCaseProvider } from './src/context/VetCaseContext';
import { VetCasesProvider } from './src/context/VetCasesContext';
import { UserContext, SessionProvider } from './src/context/UserContext';
import { NotificationProvider } from './src/context/NotificationContext';
import { VetCaseIndicatorsProvider } from './src/context/VetCaseIndicators';
import { ErrorsFeedbackProvider } from './src/context/ErrorsFeedbackContext';

SplashScreen.preventAutoHideAsync();

const App = () => {
    const { userData } = useContext(UserContext);
    const isAuthenticated = !!userData?.current_account?.access_token;

    /* 
      Ignorar o timming inválido do Pusher no ambientes android.
      https://stackoverflow.com/questions/44603362/setting-a-timer-for-a-long-period-of-time-i-e-multiple-minutes
    */
    LogBox.ignoreLogs(['Setting a timer for a long period of time']);
    LogBox.ignoreAllLogs();

    const [fontsLoaded] = useFonts({
        Inter_700Bold,
        Inter_500Medium,
        Inter_400Regular,
    });

    if (fontsLoaded) {
        return (
            <ThemeProvider theme={THEME}>
                <VetCasesProvider>
                    <VetCaseProvider>
                        <ChatProvider>
                            <Route isAuthenticated={isAuthenticated} />
                        </ChatProvider>
                    </VetCaseProvider>
                </VetCasesProvider>
            </ThemeProvider>
        );
    }

    return null
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