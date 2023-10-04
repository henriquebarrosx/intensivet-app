import React, { useEffect } from "react"
import { MaterialIcons } from "@expo/vector-icons"
import { useIsFocused } from "@react-navigation/native"
import { ScrollView, ActivityIndicator } from "react-native"

import { AbsoluteArea } from "./styles"
import { useViewModel } from "./viewModel"
import ScreenView from "../../components/ScreenView"
import { Visibility } from "../../components/Visibility"
import { DetailedInformationBox } from "../../components/DetailedInformationBox"

export function AboutCategory() {
    const isCurrentScreenFocused = useIsFocused()

    const {
        vetCaseCategory,
        vetCasePriority,
        fetchVetCaseDetails,
        vetCaseCategoryDescription,
        isLoadingIndicatorDisplayed,
    } = useViewModel()

    useEffect(() => {
        if (isCurrentScreenFocused) {
            fetchVetCaseDetails()
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

                <DetailedInformationBox
                    value={vetCaseCategory}
                    label="Categoria do Caso"
                    iconZoneColor="#ff9800"
                    icon={() => <MaterialIcons name={"category"} size={24} color={"#FFF"} />}
                />

                <DetailedInformationBox
                    label="Descrição"
                    iconZoneColor="#2196f3"
                    value={vetCaseCategoryDescription}
                    icon={() => <MaterialIcons name="description" size={21} color="#FFF" />}
                />

                <DetailedInformationBox
                    label="Classificação"
                    iconZoneColor="#5c6bc0"
                    value={vetCasePriority}
                    icon={() => <MaterialIcons name="priority-high" size={21} color="#FFF" />}
                />
            </ScrollView>
        </ScreenView>
    )
}

