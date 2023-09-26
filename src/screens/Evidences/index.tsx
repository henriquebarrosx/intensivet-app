import { ScrollView, ActivityIndicator } from "react-native"
import * as Notifications from "expo-notifications"
import { useIsFocused } from "@react-navigation/native"
import React, { useCallback, useContext, useEffect, useLayoutEffect } from "react"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

import { useViewModel } from "./viewModel"
import ScreenView from "../../components/ScreenView"
import { Visibility } from "../../components/Visibility"
import { Notification } from "../../models/Notification"
import { NotificationContext } from "../../context/NotificationContext"
import { Content, EvidenceButton, EvidencesNotFound, AbsoluteArea } from "./styles"

export function Evidences() {
    const isCurrentScreenFocused = useIsFocused()
    const { notificationListener, responseNotificationListener } = useContext(NotificationContext)

    const {
        evidences,
        getEvidenceIcon,
        openEvidenceFile,
        fetchVetCaseDetails,
        isFetchingEvidences,
        isEvidencesNotFoundTextVisible,
    } = useViewModel()

    useEffect(() => {
        if (isCurrentScreenFocused) {
            const notification = new Notification()
            Notifications.setNotificationHandler({ handleNotification: notification.getUnmuteNotificationConfig() })

            fetchVetCaseDetails()
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
            <Visibility isVisible={isFetchingEvidences}>
                <AbsoluteArea>
                    <ActivityIndicator color="#757575" />
                </AbsoluteArea>
            </Visibility>

            <Visibility isVisible={isEvidencesNotFoundTextVisible}>
                <EvidencesNotFound>Nenhuma evidência encontrada</EvidencesNotFound>
            </Visibility>

            <ScrollView style={{ flex: 1 }}>
                <Content>
                    {evidences.map((evidence) => (
                        <EvidenceButton key={evidence.service_url} onPress={() => openEvidenceFile("")}>
                            <MaterialCommunityIcons
                                size={32}
                                color={"#FFF"}
                                name={getEvidenceIcon(evidence)} />
                        </EvidenceButton>
                    ))}
                </Content>
            </ScrollView>
        </ScreenView>
    )
}
