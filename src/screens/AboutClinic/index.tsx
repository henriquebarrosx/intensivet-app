import React, { useEffect } from "react"
import { useIsFocused } from "@react-navigation/native"
import { ScrollView, ActivityIndicator } from "react-native"
import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons"

import { Avatar } from "./Avatar"
import { useViewModel } from "./viewModel"
import ScreenView from "../../components/ScreenView"
import { CardInfo } from "../../components/CardInfo"
import { Visibility } from "../../components/Visibility"
import { SectionTitle, Subtitle, Title, HeaderArea, AbsoluteArea } from "./styles"

export function AboutClinic() {
    const isCurrentScreenFocused = useIsFocused()

    const {
        avatarUri,
        clinicCnpj,
        clinicCep,
        clinicName,
        clinicEmail,
        clinicAddress,
        clinicLocation,
        clinicPhoneNumber,
        handleFetchVetCaseData,
        isLoadingIndicatorDisplayed,
    } = useViewModel()

    useEffect(() => {
        if (isCurrentScreenFocused) {
            handleFetchVetCaseData()
        }
    }, [isCurrentScreenFocused])

    return (
        <ScreenView>
            <ScrollView>
                <Visibility isVisible={isLoadingIndicatorDisplayed}>
                    <AbsoluteArea>
                        <ActivityIndicator size={32} color="#757575" />
                    </AbsoluteArea>
                </Visibility>

                <HeaderArea>
                    <Avatar uri={avatarUri} />
                    <Title>{clinicName}</Title>
                    <Subtitle>{clinicEmail}</Subtitle>
                </HeaderArea>

                <SectionTitle>Sobre</SectionTitle>

                <CardInfo
                    unified
                    borderTop
                    label="CNPJ"
                    value={clinicCnpj}
                    iconZoneColor="#64b5f6"
                    icon={() => <FontAwesome name="id-card-o" size={18} color="#FFF" />}
                />

                <CardInfo
                    unified
                    borderBottom
                    label="Contato"
                    value={clinicPhoneNumber}
                    iconZoneColor="#eda02d"
                    icon={() => <FontAwesome5 name="phone-alt" size={21} color="#FFF" />}
                />

                <SectionTitle>Endereço</SectionTitle>

                <CardInfo
                    unified
                    borderTop
                    label="CEP"
                    value={clinicCep}
                    iconZoneColor="#9ccc65"
                    icon={() => <Ionicons name="location" size={21} color="#FFF" />}
                />

                <CardInfo
                    unified
                    label="Endereço"
                    value={clinicAddress}
                    iconZoneColor="#5c6bc0"
                    icon={() => <FontAwesome name="street-view" size={21} color="#FFF" />}
                />

                <CardInfo
                    unified
                    borderBottom
                    label="Localidade"
                    value={clinicLocation}
                    iconZoneColor="#f06292"
                    icon={() => <FontAwesome5 name="city" size={16} color="#FFF" />}
                />
            </ScrollView>
        </ScreenView>
    )
}
