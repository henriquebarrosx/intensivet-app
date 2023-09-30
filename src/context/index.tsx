import { ErrorsFeedbackProvider } from "./ErrorsFeedbackContext";
import { NetworkProvider } from "./NetworkContext";
import { NotificationProvider } from "./NotificationContext";
import { SessionProvider } from "./UserContext";
import { VetCaseIndicatorsProvider } from "./VetCaseIndicators";

export function injectGlobalProviders(Component: any) {
    return (props: any) => (
        <VetCaseIndicatorsProvider>
            <ErrorsFeedbackProvider>
                <NotificationProvider>
                    <SessionProvider>
                        <NetworkProvider>
                            <Component {...props} />
                        </NetworkProvider>
                    </SessionProvider>
                </NotificationProvider>
            </ErrorsFeedbackProvider>
        </VetCaseIndicatorsProvider>
    )
}