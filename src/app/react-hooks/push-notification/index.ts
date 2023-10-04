import { useEffect, useRef } from "react"
import Pusher from "pusher-js/react-native"
import * as Notifications from "expo-notifications"

import { env } from "../../../infra/config/environment"
import { VetCaseModel } from "../../../schemas/VetCase"
import { MessageModel } from "../../../schemas/Message"
import { useSession } from "../../../context/UserContext"
import { useVetCase } from "../../../context/VetCaseContext"
import { useServices } from "../../../context/ServicesContext"
import { logger } from "../../../infra/adapters/logger-adapter"
import { CHANNELS, CHANNELS_EVENTS } from "../../../schemas/Pusher"
import { useVetCasesContext } from "../../../context/VetCasesContext"
import { MessageMapper } from "../../../infra/mappers/message-mapper"
import { useVetCaseMessagesContext } from "../../../context/VetCaseMessagesContext"


let GENERAL_CHANNEL = null

export function usePushNotification() {
    const sessionContext = useSession()
    const vetCaseContext = useVetCase()
    const vetCasesContext = useVetCasesContext()
    const { notificationService } = useServices()
    const vetCaseMessagesContext = useVetCaseMessagesContext()

    const notificationListener = useRef<Subscription>()
    const responseNotificationListener = useRef<Subscription>()

    const channelName = sessionContext.isAdmin
        ? CHANNELS.ADMIN
        : CHANNELS.CLINIC + sessionContext.clinicId

    const pusherService = useRef(
        new Pusher(env.pusherjsAppKey, {
            cluster: "mt1",
        })
    )

    useEffect(
        () => {
            logger.info("PUSH NOTIFICATION", `Subscribing channel ${channelName}`)
            GENERAL_CHANNEL = pusherService.current.subscribe(channelName)

            GENERAL_CHANNEL.bind(
                CHANNELS_EVENTS.NEW_CASE,
                (vetCase: VetCaseModel) => {
                    logger.info("PUSH NOTIFICATION", "new message created")
                    vetCasesContext.add(vetCase)
                }
            )

            GENERAL_CHANNEL.bind(
                CHANNELS_EVENTS.NEW_MESSAGE,
                (messageData: MessageModel) => {
                    logger.info("PUSH NOTIFICATION", "new message received")
                    const belongsToOpenedChat = messageData.vet_case_id === vetCaseContext.data?.id

                    if (belongsToOpenedChat) {
                        const message = MessageMapper.apply(messageData)
                        vetCaseMessagesContext.add(message)
                        return
                    }

                    vetCasesContext.receiveMessage(messageData)
                }
            )

            //     notificationListener.current = Notifications.addNotificationReceivedListener(
            //         (event) => {
            //             const notification = new Notification(event)

            //             const isNotificationEnabled = notification
            //                 .canDisplayNotification(vetCaseContext.data?.id)

            //             isNotificationEnabled
            //                 ? notificationService.enable()
            //                 : notificationService.disable()
            //         }
            //     )

            //     responseNotificationListener.current = Notifications
            //         .addNotificationResponseReceivedListener(() => { })

            return () => {
                logger.info("PUSH NOTIFICATION", `Unsubscribing channel ${channelName}`)
                // Notifications.removeNotificationSubscription(responseNotificationListener.current)
                // Notifications.removeNotificationSubscription(notificationListener.current)
                GENERAL_CHANNEL.unsubscribe()
                GENERAL_CHANNEL.unbind_all()
            }
        },
        [channelName, vetCaseContext.data?.id]
    )

    useEffect(
        () => {
            if (GENERAL_CHANNEL && !sessionContext.isAuthenticated) {
                GENERAL_CHANNEL.unsubscribe()
                GENERAL_CHANNEL.unbind_all()
            }
        },
        [sessionContext.isAuthenticated]
    )

    return
}

type Subscription = {
    remove(): void
}