import React, { useEffect } from "react"
import { useIsFocused } from "@react-navigation/native"

import { Avatar } from "./Avatar"
import { useViewModel } from "./useViewModel"
import { Switch } from "../../components/Switch"
import ScreenView from "../../components/ScreenView"
import { useSession } from "../../context/UserContext"
import { pushNotification } from "../../infra/adapters/push-notification"
import { ActionsArea, ActionText, ButtonArea, Divider, DoctorEmail, DoctorName, HeaderArea } from "./styles"

export default function Profile() {
    const sessionContext = useSession()
    const isCurrentScreenFocused = useIsFocused()

    const profileName = sessionContext.sessionData.current_account.doctor_name
    const profileEmail = sessionContext.sessionData.current_account.email

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

    return (
        <ScreenView>
            <HeaderArea>
                <Avatar uri={userThumbnail} />
                <DoctorName>{profileName}</DoctorName>
                <DoctorEmail>{profileEmail}</DoctorEmail>
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
