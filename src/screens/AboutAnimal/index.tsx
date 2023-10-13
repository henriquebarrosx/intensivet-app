import React, { useEffect } from "react"
import { useIsFocused } from "@react-navigation/native"
import { ScrollView, ActivityIndicator } from "react-native"
import { Ionicons, MaterialCommunityIcons, AntDesign, FontAwesome5 } from "@expo/vector-icons"

import { useViewModel } from "./viewModel"
import ScreenView from "../../components/ScreenView"
import { CardInfo } from "../../components/CardInfo"
import { Visibility } from "../../components/Visibility"
import { pushNotification } from "../../infra/adapters/push-notification"
import { BoxPetIconArea, Subtitle, Title, HeaderArea, SectionTitle } from "./styles"

export function AboutAnimal() {
    const isCurrentScreenFocused = useIsFocused()

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

                <SectionTitle>Sobre</SectionTitle>

                <CardInfo
                    unified
                    borderTop
                    label="Raça"
                    value={petSpecies}
                    iconZoneColor="#5c6bc0"
                    icon={() => <AntDesign name="idcard" size={19} color="#FFF" />}
                />

                <CardInfo
                    unified
                    label="Nascimento"
                    value={petBirthDate}
                    iconZoneColor="#64b5f6"
                    icon={() => <Ionicons name="ios-calendar" size={21} color="#FFF" />}
                />

                <CardInfo
                    unified
                    label="Gênero"
                    value={petGender}
                    iconZoneColor="#ff9800"
                    icon={() => <MaterialCommunityIcons name="gender-male-female" size={24} color="#FFF" />}
                />

                <CardInfo
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

