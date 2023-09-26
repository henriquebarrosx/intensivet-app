import * as Notifications from "expo-notifications"
import { useIsFocused } from "@react-navigation/native"
import React, { useContext, useEffect, useState } from "react"

import Filter from "./Filter"
import Header from "./Header"
import ListView from "./ListView"
import { useVetCaseList } from "./script"
import TryAgainButton from "./TryAgainButton"
import { getChannelName } from "../../utils/pusher"
import RefreshIndicator from "./RefreshIndicator"
import ScrollToTopButton from "./ScrollToTopButton"
import ScreenView from "../../components/ScreenView"
import { VetCaseModel } from "../../schemas/VetCase"
import { MessageModel } from "../../schemas/Message"
import { CHANNELS_EVENTS } from "../../schemas/Pusher"
import { UserContext } from "../../context/UserContext"
import { Notification } from '../../models/Notification'
import { useVetCases } from "../../context/VetCasesContext"
import { NotificationContext } from "../../context/NotificationContext"
import { OrderVetCaseContext, OrderVetCaseProvider } from "../../context/OrderVetCases"

function VetCases() {
    const isFocused = useIsFocused()
    const vetCasesViewModel = useVetCases()
    const { fetchVetCaseList } = useVetCaseList()
    const vetCasesFilter = useContext(OrderVetCaseContext)

    const { sessionData: userData } = useContext(UserContext)
    const [isDisplayingButton, displayButton] = useState(false)
    const { pusherService, notificationListener, responseNotificationListener } = useContext(NotificationContext)

    useEffect(() => {
        if (isFocused) {
            const DEFAULT_PAGE = 1
            fetchVetCaseList(DEFAULT_PAGE, vetCasesFilter.selected)
        }
    }, [isFocused])

    useEffect(() => {
        if (isFocused) {
            const notification = new Notification()

            Notifications.setNotificationHandler({
                handleNotification: notification.getUnmuteNotificationConfig()
            })
        }
    }, [isFocused])

    useEffect(() => {
        pusherService.current.subscribe(getChannelName(userData!))

        notificationListener.current = Notifications.addNotificationReceivedListener((event) => {
            console.log({ notificationReceived: event })
        })
        responseNotificationListener.current = Notifications.addNotificationResponseReceivedListener((event) => {
            console.log({ notificationResponse: event })
        })

        return () => {
            pusherService.current.unsubscribe(getChannelName(userData!))
            Notifications.removeNotificationSubscription(notificationListener.current)
            Notifications.removeNotificationSubscription(responseNotificationListener.current)
        }
    }, [])

    useEffect(() => {
        pusherService.current.bind(CHANNELS_EVENTS.NEW_CASE, (vetCase: VetCaseModel) => {
            console.log("[push notification]: New vet case received")
            vetCasesViewModel.addNewVetCase(vetCase)
        })

        pusherService.current.bind(CHANNELS_EVENTS.NEW_MESSAGE, (message: MessageModel) => {
            console.log("[push notification]: New message received")
            vetCasesViewModel.updateLastMessage(message)
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

export default () => (
    <OrderVetCaseProvider>
        <VetCases />
    </OrderVetCaseProvider>
)

