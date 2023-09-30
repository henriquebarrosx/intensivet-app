import Pusher from "pusher-js/react-native";
import { WithChildren } from '../@types/common';
import React, { useRef, createContext, MutableRefObject } from 'react';

export type Subscription = {
    remove: () => void;
};

interface NotificationContextType {
    pusherService: MutableRefObject<Pusher>;
    notificationListener: MutableRefObject<any>;
    responseNotificationListener: MutableRefObject<any>;
}

export const NotificationContext = createContext({} as NotificationContextType);

enum ENVIROMENT {
    STAGING = '3e8071ca178d120546a5',
    PRODUCTION = 'f63932033b491e9d4a9f',
}

export function NotificationProvider({ children }: WithChildren) {
    const notificationListener = useRef<Subscription>();
    const responseNotificationListener = useRef<Subscription>();

    const pusherService = useRef(
        new Pusher(ENVIROMENT.STAGING, {
            cluster: "mt1",
        })
    );

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
