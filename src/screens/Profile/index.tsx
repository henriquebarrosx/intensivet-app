import * as Notifications from "expo-notifications"
import { useIsFocused } from "@react-navigation/native"
import React, { useCallback, useContext, useEffect, useLayoutEffect } from "react"

import { Avatar } from "./Avatar"
import { useViewModel } from "./useViewModel"
import { Switch } from "../../components/Switch"
import ScreenView from "../../components/ScreenView"
import { UserContext } from "../../context/UserContext"
import { NotificationContext } from "../../context/NotificationContext"
import { pushNotification } from "../../infra/adapters/push-notification"
import { ActionsArea, ActionText, ButtonArea, Divider, DoctorEmail, DoctorName, HeaderArea } from "./styles"

export default function Profile() {
    const isCurrentScreenFocused = useIsFocused()
    const { sessionData: userData } = useContext(UserContext)
    const { notificationListener, responseNotificationListener } = useContext(NotificationContext)

    const {
        userThumbnail,
        removeCurrentSession,
        handlePushNotification,
        isNotificationsEnabled: shouldReceiveNotification,
    } = useViewModel()

    useEffect(() => {
        if (isCurrentScreenFocused) {
            pushNotification.enableNotificationsLocally()
        }
    }, [isCurrentScreenFocused])

    useLayoutEffect(
        useCallback(() => {
            notificationListener.current = Notifications.addNotificationReceivedListener(() => { })
            responseNotificationListener.current = Notifications.addNotificationResponseReceivedListener(() => { })

            return () => {
                Notifications.removeNotificationSubscription(notificationListener.current)
                Notifications.removeNotificationSubscription(responseNotificationListener.current)
            }
        }, [])
    )

    return (
        <ScreenView>
            <HeaderArea>
                <Avatar uri={userThumbnail} />
                <DoctorName>{userData!.current_account.doctor_name}</DoctorName>
                <DoctorEmail>{userData!.current_account.email}</DoctorEmail>
            </HeaderArea>

            <ActionsArea>
                <Switch
                    label={"Notificações"}
                    isChecked={shouldReceiveNotification}
                    changeSwitchValue={handlePushNotification}
                />

                <Divider />

                <ButtonArea onPress={removeCurrentSession}>
                    <ActionText>Sair</ActionText>
                </ButtonArea>
            </ActionsArea>
        </ScreenView>
    )
}
