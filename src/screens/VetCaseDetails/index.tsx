import React from "react"
import { ScrollView } from "react-native"

import { Avatar } from "./Avatar"
import { useViewModel } from "./useViewModel"
import ScreenView from "../../components/ScreenView"
import { SectionTitle } from "../../components/SectionTitle"
import { InformationActionBox } from "../../components/InformationActionBox"
import { DoctorEmail, DoctorName, HeaderContainer, Description, SpaceArea } from "./styles"

import {
    Entypo,
    Fontisto,
    Foundation,
    FontAwesome5,
    MaterialIcons,
} from "@expo/vector-icons"

export function VetCaseDetails() {
    const {
        subtitle,
        clinicName,
        isPuctualCase,
        clinicThumbnail,
    } = useViewModel()

    return (
        <ScreenView>
            <ScrollView>
                <SpaceArea top={0} bottom={140}>
                    <HeaderContainer>
                        <Avatar uri={clinicThumbnail} />
                        <DoctorName>{clinicName}</DoctorName>
                        <DoctorEmail>{subtitle}</DoctorEmail>
                    </HeaderContainer>

                    <SectionTitle value="Dados do caso" />

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

                    <SectionTitle value="Sobre" />

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

                    <Description>
                        Apenas casos do tipo completo possuem uma ficha veterinária.
                    </Description>

                    <SectionTitle value="Anexos" />

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
