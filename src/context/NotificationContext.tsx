import React, { ReactNode, createContext } from "react"
import { usePushNotification } from "../app/react-hooks/push-notification"

export const NotificationContext = createContext<void>(null)

export function NotificationProvider({ children }: { children: ReactNode }) {
    return (
        <NotificationContext.Provider value={usePushNotification()}>
            {children}
        </NotificationContext.Provider>
    )
}

export function injectPushNotification(Component: any) {
    return (props: any) =>
        <NotificationProvider>
            <Component {...props} />
        </NotificationProvider>
}