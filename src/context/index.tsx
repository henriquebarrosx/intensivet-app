import { ThemeProvider } from "styled-components/native"

import THEME from "../theme"
import { SessionProvider } from "./UserContext"
import { NetworkProvider } from "./NetworkContext"
import { VetCaseProvider } from "./VetCaseContext"
import { VetCasesProvider } from "./VetCasesContext"
import { VetCaseIndicatorsProvider } from "./VetCaseIndicators"
import { ErrorsFeedbackProvider } from "./ErrorsFeedbackContext"
import { VetCaseMessagesProvider } from "./VetCaseMessagesContext"

export function injectGlobalProviders(Component: any) {
    return (props: any) => (
        <VetCaseIndicatorsProvider>
            <ErrorsFeedbackProvider>
                <SessionProvider>
                    <NetworkProvider>
                        <ThemeProvider theme={THEME}>
                            <VetCasesProvider>
                                <VetCaseProvider>
                                    <VetCaseMessagesProvider>
                                        <Component {...props} />
                                    </VetCaseMessagesProvider>
                                </VetCaseProvider>
                            </VetCasesProvider>
                        </ThemeProvider>
                    </NetworkProvider>
                </SessionProvider>
            </ErrorsFeedbackProvider>
        </VetCaseIndicatorsProvider>
    )
}