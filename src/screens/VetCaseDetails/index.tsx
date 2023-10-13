import React from "react"
import { ScrollView } from "react-native"
import { Entypo, Fontisto, Foundation, FontAwesome5, MaterialIcons } from "@expo/vector-icons"

import { Avatar } from "./Avatar"
import { useViewModel } from "./useViewModel"
import ScreenView from "../../components/ScreenView"
import { CardAction } from "../../components/CardAction"
import { DoctorEmail, DoctorName, HeaderContainer, SectionTitle, SpaceArea } from "./styles"


export function VetCaseDetails() {
    const { subtitle, clinicName, isPuctualCase, clinicThumbnail } = useViewModel()

    return (
        <ScreenView>
            <ScrollView>
                <SpaceArea top={0} bottom={140}>
                    <HeaderContainer>
                        <Avatar uri={clinicThumbnail} />
                        <DoctorName>{clinicName}</DoctorName>
                        <DoctorEmail>{subtitle}</DoctorEmail>
                    </HeaderContainer>

                    <SectionTitle>Dados do caso</SectionTitle>

                    <CardAction
                        unified
                        borderTop
                        label="Animal"
                        iconZoneColor="#a5d6a7"
                        redirectToPath="VetCaseAnimal"
                        icon={() => <MaterialIcons name="pets" size={21} color="#FFF" />}
                    />

                    <CardAction
                        unified
                        label="Clínica"
                        iconZoneColor="#f44336"
                        redirectToPath="VetCaseClinic"
                        icon={() => <FontAwesome5 name="hospital-alt" size={16} color="#FFF" />}
                    />

                    <CardAction
                        unified
                        borderBottom
                        label="Veterinário"
                        iconZoneColor="#03a9f4"
                        redirectToPath="VetCaseVeterinarian"
                        icon={() => <Fontisto name="doctor" size={21} color="#FFF" />}
                    />

                    <SectionTitle>Sobre</SectionTitle>

                    <CardAction
                        unified
                        borderTop
                        label="Categoria do Caso"
                        iconZoneColor="#ff9800"
                        redirectToPath="VetCaseCategory"
                        icon={() => <MaterialIcons name={"category"} size={24} color={"#FFF"} />}
                    />

                    <CardAction
                        unified
                        borderBottom
                        label="Ficha Veterinária"
                        iconZoneColor="#4db6ac"
                        disabled={isPuctualCase}
                        redirectToPath="VetCaseVeterinarianRecords"
                        description="Apenas casos do tipo completo possuem uma ficha veterinária."
                        icon={() => <Foundation name={"clipboard-notes"} size={21} color={"#FFF"} />}
                    />

                    <SectionTitle>Anexos</SectionTitle>

                    <CardAction
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
