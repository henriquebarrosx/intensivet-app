import React, { useEffect } from "react"
import { useIsFocused } from "@react-navigation/native"
import { ScrollView, ActivityIndicator } from "react-native"
import { Ionicons, AntDesign, FontAwesome } from "@expo/vector-icons"

import { Avatar } from "./Avatar"
import { useViewModel } from "./viewModel"
import ScreenView from "../../components/ScreenView"
import { AbsoluteArea } from "../AboutClinic/styles"
import { Subtitle, Title, HeaderArea } from "./styles"
import { Visibility } from "../../components/Visibility"
import { InformationBox } from "../../components/InformationBox"
import { SectionTitle } from "../../components/SectionTitle"

export function AboutVet() {
    const isCurrentScreenFocused = useIsFocused()

    const {
        title,
        vetCrmv,
        subtitle,
        avatarUri,
        vetBirthDate,
        vetPhoneNumber,
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
                    <Title>{title}</Title>
                    <Subtitle>{subtitle}</Subtitle>
                </HeaderArea>

                <SectionTitle value="Sobre" />

                <InformationBox
                    unified
                    borderTop
                    label="CRMV"
                    value={vetCrmv}
                    iconZoneColor="#5c6bc0"
                    icon={() => <AntDesign name="idcard" size={19} color="#FFF" />}
                />

                <InformationBox
                    unified
                    label="Nascimento"
                    value={vetBirthDate}
                    iconZoneColor="#64b5f6"
                    icon={() => <Ionicons name="ios-calendar" size={21} color="#FFF" />}
                />

                <InformationBox
                    unified
                    borderBottom
                    label="Contato"
                    value={vetPhoneNumber}
                    iconZoneColor="#ff9800"
                    icon={() => <FontAwesome name="phone" size={24} color="#FFF" />}
                />
            </ScrollView>
        </ScreenView>
    )
}

