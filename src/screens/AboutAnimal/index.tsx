import { ActivityIndicator } from "react-native"
import * as Notifications from "expo-notifications"
import { useIsFocused } from "@react-navigation/native"
import React, { useCallback, useContext, useEffect, useLayoutEffect } from "react"
import { Ionicons, MaterialCommunityIcons, AntDesign, FontAwesome5 } from "@expo/vector-icons"

import { ScrollView } from "react-native"
import { useViewModel } from "./viewModel"
import ScreenView from "../../components/ScreenView"
import { Visibility } from "../../components/Visibility"
import { InformationBox } from "../../components/InformationBox"
import { SectionInfoTitle } from "../../components/SectionInfoTitle"
import { BoxPetIconArea, Subtitle, Title, HeaderArea } from "./styles"
import { NotificationContext } from "../../context/NotificationContext"
import { pushNotification } from "../../infra/adapters/push-notification"

export function AboutAnimal() {
    const isCurrentScreenFocused = useIsFocused()
    const { notificationListener, responseNotificationListener } = useContext(NotificationContext)

    const {
        petName,
        petBreed,
        petGender,
        petWeight,
        petSpecies,
        petIconName,
        petBirthDate,
        handleFetchVetCaseData,
        isLoadingIndicatorDisplayed,
    } = useViewModel()


    useEffect(() => {
        if (isCurrentScreenFocused) {
            pushNotification.enableNotificationsLocally()
            handleFetchVetCaseData()
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
                <HeaderArea>
                    <BoxPetIconArea color="#a5d6a7">
                        <Visibility isVisible={!isLoadingIndicatorDisplayed}>
                            <FontAwesome5 name={petIconName} size={62} color="#FFF" />
                        </Visibility>

                        <Visibility isVisible={isLoadingIndicatorDisplayed}>
                            <ActivityIndicator size={32} color={"#FFFFFF"} />
                        </Visibility>
                    </BoxPetIconArea>

                    <Title>{petName}</Title>
                    <Subtitle>{petBreed}</Subtitle>
                </HeaderArea>

                <SectionInfoTitle value="Sobre" />

                <InformationBox
                    unified
                    borderTop
                    label="Raça"
                    value={petSpecies}
                    iconZoneColor="#5c6bc0"
                    icon={() => <AntDesign name="idcard" size={19} color="#FFF" />}
                />

                <InformationBox
                    unified
                    label="Nascimento"
                    value={petBirthDate}
                    iconZoneColor="#64b5f6"
                    icon={() => <Ionicons name="ios-calendar" size={21} color="#FFF" />}
                />

                <InformationBox
                    unified
                    label="Gênero"
                    value={petGender}
                    iconZoneColor="#ff9800"
                    icon={() => <MaterialCommunityIcons name="gender-male-female" size={24} color="#FFF" />}
                />

                <InformationBox
                    unified
                    label="Peso"
                    borderBottom
                    value={petWeight}
                    iconZoneColor="#8bc34a"
                    icon={() => <FontAwesome5 name="weight" size={18} color="#FFF" />}
                />
            </ScrollView>
        </ScreenView>
    )
}

