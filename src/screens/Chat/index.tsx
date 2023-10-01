import * as Notifications from "expo-notifications"
import { useIsFocused } from "@react-navigation/native"
import React, { Fragment, useContext, useEffect } from "react"

import Messages from "./Messages"
import { InputArea } from "./InputArea"
import ModalAttachment from "./ModalAttachment"
import { useChat } from "../../context/ChatContext"
import { MessageModel } from "../../schemas/Message"
import ScreenView from "../../components/ScreenView"
import { CHANNELS_EVENTS } from "../../schemas/Pusher"
import ModalToVideoPreview from "./ModalToPreview/Video"
import ModalToImagePreview from "./ModalToPreview/Image"
import { useVetCase } from "../../context/VetCaseContext"
import { useVetCasesContext } from "../../context/VetCasesContext"
import { useServices } from "../../context/ServicesContext"
import { MessageProvider } from "../../context/MessageContext"
import { AudioRecordProvider } from "../../context/RecordAudio"
import { Notification } from "../../domain/entities/notification"
import { NotificationContext } from "../../context/NotificationContext"
import { FileAttachmentModalProvider } from "../../context/AttachModal"

interface Props {
    route: { params: { videoUri: string } }
}

function Chat(props: Props) {
    const { notificationService } = useServices()
    const isCurrentScreenFocused = useIsFocused()
    const videoUri = props?.route?.params?.videoUri

    const chatViewModel = useChat()
    const vetCaseContext = useVetCase()
    const vetCasesContext = useVetCasesContext()
    const { pusherService, notificationListener, responseNotificationListener } = useContext(NotificationContext)

    useEffect(() => {
        (async () => {
            const PAGE_NUMBER = 1
            const IS_LOADER_VISIBLE = !videoUri
            await chatViewModel.fetchMessages(PAGE_NUMBER, IS_LOADER_VISIBLE)
        })()

        return () => {
            /*
                The chat screen keep receiving messages. So, it"s important that all vet case messages
                only be marked as read when component be unmounted!
            */
            chatViewModel.cleanChat()
            vetCaseContext.markVetCaseMessageAsRead()
        }
    }, [])

    useEffect(() => {
        if (isCurrentScreenFocused) {
            pusherService.current.bind(CHANNELS_EVENTS.NEW_MESSAGE, (message: MessageModel) => {
                vetCasesContext.receiveMessage(message)
                chatViewModel.receiveNewMessage(message)
            })

            notificationListener.current = Notifications
                .addNotificationReceivedListener((event) => {
                    const notification = new Notification(event)

                    const isNotificationEnabled = notification
                        .canDisplayNotification(vetCaseContext.vetCase.id)

                    isNotificationEnabled
                        ? notificationService.enable()
                        : notificationService.disable()
                })

            responseNotificationListener.current = Notifications
                .addNotificationResponseReceivedListener(() => { })

            return () => {
                pusherService.current.unsubscribe(CHANNELS_EVENTS.NEW_MESSAGE)
                Notifications.removeNotificationSubscription(notificationListener.current)
                Notifications.removeNotificationSubscription(responseNotificationListener.current)
            }
        }

    }, [isCurrentScreenFocused])

    return (
        <Fragment>
            <ScreenView>
                <Messages />
                <InputArea />
            </ScreenView>

            <ModalToImagePreview />
            <ModalToVideoPreview />
            <ModalAttachment assetMediaUri={videoUri} />
        </Fragment>
    )
}

export default (props: Props) => (
    <MessageProvider>
        <FileAttachmentModalProvider>
            <AudioRecordProvider>
                <Chat {...props} />
            </AudioRecordProvider>
        </FileAttachmentModalProvider>
    </MessageProvider>
)
