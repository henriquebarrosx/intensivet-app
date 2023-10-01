import Pusher from "pusher-js/react-native"
import React, { useRef, createContext, MutableRefObject } from "react"
import { WithChildren } from "../@types/common"
import { env } from "../infra/config/environment"

export type Subscription = {
    remove: () => void
}

interface NotificationContextType {
    pusherService: MutableRefObject<Pusher>
    notificationListener: MutableRefObject<any>
    responseNotificationListener: MutableRefObject<any>
}

export const NotificationContext = createContext({} as NotificationContextType)

export function NotificationProvider({ children }: WithChildren) {
    const notificationListener = useRef<Subscription>()
    const responseNotificationListener = useRef<Subscription>()

    const pusherService = useRef(
        new Pusher(env.pusherjsAppKey, {
            cluster: "mt1",
        })
    )

    return (
        <NotificationContext.Provider
            value={{
                pusherService,
                notificationListener,
                responseNotificationListener,
            }}
        >
            {children}
        </NotificationContext.Provider>
    )
}
