import * as Notifications from "expo-notifications"
import { useIsFocused } from "@react-navigation/native"
import React, { useContext, useEffect, useState } from "react"

import Filter from "./Filter"
import Header from "./Header"
import ListView from "./ListView"
import TryAgainButton from "./TryAgainButton"
import RefreshIndicator from "./RefreshIndicator"
import { getChannelName } from "../../utils/pusher"
import ScrollToTopButton from "./ScrollToTopButton"
import ScreenView from "../../components/ScreenView"
import { VetCaseModel } from "../../schemas/VetCase"
import { MessageModel } from "../../schemas/Message"
import { CHANNELS_EVENTS } from "../../schemas/Pusher"
import { UserContext } from "../../context/UserContext"
import { useVetCasesContext } from "../../context/VetCasesContext"
import { NotificationContext } from "../../context/NotificationContext"
import { pushNotification } from "../../infra/adapters/push-notification"

export default function VetCases() {
    const isFocused = useIsFocused()
    const vetCasesContext = useVetCasesContext()

    const { sessionData: userData } = useContext(UserContext)
    const [isDisplayingButton, displayButton] = useState(false)
    const { pusherService, notificationListener, responseNotificationListener } = useContext(NotificationContext)

    useEffect(() => {
        if (isFocused) {
            const DEFAULT_PAGE = 1
            vetCasesContext.findAll(DEFAULT_PAGE, vetCasesContext.orderedBy)
        }
    }, [isFocused])

    useEffect(() => {
        if (isFocused) {
            pushNotification.enableNotificationsLocally()
        }
    }, [isFocused])

    useEffect(() => {
        pusherService.current.subscribe(getChannelName(userData!))

        notificationListener.current = Notifications.addNotificationReceivedListener(() => { })
        responseNotificationListener.current = Notifications.addNotificationResponseReceivedListener(() => { })

        return () => {
            pusherService.current.unsubscribe(getChannelName(userData!))
            Notifications.removeNotificationSubscription(notificationListener.current)
            Notifications.removeNotificationSubscription(responseNotificationListener.current)
        }
    }, [])

    useEffect(() => {
        pusherService.current.bind(CHANNELS_EVENTS.NEW_CASE, (vetCase: VetCaseModel) => {
            vetCasesContext.add(vetCase)
        })

        pusherService.current.bind(CHANNELS_EVENTS.NEW_MESSAGE, (message: MessageModel) => {
            vetCasesContext.receiveMessage(message)
        })
    }, [])

    return (
        <ScreenView>
            <Header />
            <Filter />
            <TryAgainButton />

            <RefreshIndicator />
            <ListView touchTheTop={displayButton} />
            <ScrollToTopButton isVisible={isDisplayingButton} />
        </ScreenView>
    )
}
