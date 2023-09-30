import { ScrollView } from "react-native"
import * as Notifications from "expo-notifications"
import { useIsFocused } from "@react-navigation/native"
import React, { useCallback, useContext, useEffect, useLayoutEffect } from "react"

import { Avatar } from "./Avatar"
import { useViewModel } from "./useViewModel"
import ScreenView from "../../components/ScreenView"
import { SectionInfoTitle } from "../../components/SectionInfoTitle"
import { NotificationContext } from "../../context/NotificationContext"
import { pushNotification } from "../../infra/adapters/push-notification"
import { InformationActionBox } from "../../components/InformationActionBox"
import { DoctorEmail, DoctorName, HeaderArea, Note, SpaceArea } from "./styles"

import {
    Entypo,
    Fontisto,
    Foundation,
    FontAwesome5,
    MaterialIcons,
} from "@expo/vector-icons"

export function VetCaseDetails() {
    const isCurrentScreenFocused = useIsFocused()
    const { notificationListener, responseNotificationListener } = useContext(NotificationContext)

    const {
        subtitle,
        clinicName,
        isPuctualCase,
        clinicThumbnail,
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
            <ScrollView>
                <SpaceArea top={0} bottom={140}>
                    <HeaderArea>
                        <Avatar uri={clinicThumbnail} />
                        <DoctorName>{clinicName}</DoctorName>
                        <DoctorEmail>{subtitle}</DoctorEmail>
                    </HeaderArea>

                    <SectionInfoTitle value="Dados do caso" />

                    <InformationActionBox
                        unified
                        borderTop
                        label="Animal"
                        iconZoneColor="#a5d6a7"
                        redirectToPath="VetCaseAnimal"
                        icon={() => <MaterialIcons name="pets" size={21} color="#FFF" />}
                    />

                    <InformationActionBox
                        unified
                        label="Clínica"
                        iconZoneColor="#f44336"
                        redirectToPath="VetCaseClinic"
                        icon={() => <FontAwesome5 name="hospital-alt" size={16} color="#FFF" />}
                    />

                    <InformationActionBox
                        unified
                        borderBottom
                        label="Veterinário"
                        iconZoneColor="#03a9f4"
                        redirectToPath="VetCaseVeterinarian"
                        icon={() => <Fontisto name="doctor" size={21} color="#FFF" />}
                    />

                    <SectionInfoTitle value="Sobre" />

                    <InformationActionBox
                        unified
                        borderTop
                        label="Categoria do Caso"
                        iconZoneColor="#ff9800"
                        redirectToPath="VetCaseCategory"
                        icon={() => <MaterialIcons name={"category"} size={24} color={"#FFF"} />}
                    />

                    <InformationActionBox
                        unified
                        borderBottom
                        label="Ficha Veterinária"
                        iconZoneColor="#4db6ac"
                        disabled={isPuctualCase}
                        redirectToPath="VetCaseVeterinarianRecords"
                        icon={() => <Foundation name={"clipboard-notes"} size={21} color={"#FFF"} />}
                    />

                    <Note>
                        Apenas casos do tipo completo possuem uma ficha veterinária.
                    </Note>

                    <SectionInfoTitle value="Anexos" />

                    <InformationActionBox
                        label="Evidências"
                        iconZoneColor="#5c6bc0"
                        redirectToPath="VetCaseEvidences"
                        icon={() => <Entypo name={"image-inverted"} size={21} color={"#FFF"} />}
                    />
                </SpaceArea>
            </ScrollView>
        </ScreenView>
    )
}
