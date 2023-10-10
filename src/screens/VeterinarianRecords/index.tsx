import React, { useEffect } from "react"
import { useIsFocused } from "@react-navigation/native"
import { ScrollView, ActivityIndicator } from "react-native"
import { FontAwesome5, FontAwesome, Entypo, MaterialIcons, AntDesign } from "@expo/vector-icons"

import { SpaceArea } from "./styles"
import { useViewModel } from "./viewModel"
import ScreenView from "../../components/ScreenView"
import { AbsoluteArea } from "../AboutClinic/styles"
import { Visibility } from "../../components/Visibility"
import { InformationBox } from "../../components/InformationBox"
import { SectionTitle } from "../../components/SectionTitle"
import { DetailedInformationBox } from "../../components/DetailedInformationBox"

export function VeterinarianRecords() {
    const isCurrentScreenFocused = useIsFocused()

    const {
        vetCaseDetails,
        fetchVetCaseDetails,
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

                <SpaceArea top={10} bottom={140}>
                    <SectionTitle value="Exames" />

                    <InformationBox
                        unified
                        borderTop
                        label="Peso"
                        iconZoneColor="#8bc34a"
                        value={`${vetCaseDetails?.pet_anamnesis?.weight || "---"} Kg`}
                        icon={() => <FontAwesome5 name="weight" size={16} color="#FFF" />}
                    />

                    <InformationBox
                        unified
                        iconZoneColor="#f44336"
                        label="Frequência Cardíaca"
                        value={`${vetCaseDetails?.pet_anamnesis?.heart_rate || "---"} bpm`}
                        icon={() => <FontAwesome name="heartbeat" size={18} color="#FFF" />}
                    />

                    <InformationBox
                        unified
                        iconZoneColor="#03a9f4"
                        label="Frequência Respiratória"
                        icon={() => <Entypo name="air" size={18} color="#FFF" />}
                        value={`${vetCaseDetails?.pet_anamnesis?.respiratory_frequency || "---"} mpm`}
                    />

                    <InformationBox
                        unified
                        label=" Consciência"
                        iconZoneColor="#3f51b5"
                        value={vetCaseDetails?.pet_anamnesis?.consciousness}
                        icon={() => <MaterialIcons name="priority-high" size={18} color="#FFF" />}
                    />

                    <InformationBox
                        unified
                        label="TPC"
                        iconZoneColor="#fbc02d"
                        value={vetCaseDetails?.pet_anamnesis?.tpc}
                        icon={() => <Entypo name="thermometer" size={18} color="#FFF" />}
                    />

                    <InformationBox
                        unified
                        label="Pressão Art. Sistólica"
                        iconZoneColor="#90a4ae"
                        value={`${vetCaseDetails?.pet_anamnesis?.pas || "---"} bpm`}
                        icon={() => <Entypo name="thermometer" size={18} color="#FFF" />}
                    />

                    <InformationBox
                        unified
                        label="Pressão Art. Diastólica"
                        iconZoneColor="#90a4ae"
                        value={`${vetCaseDetails?.pet_anamnesis?.pad || "---"} bpm`}
                        icon={() => <Entypo name="thermometer" size={18} color="#FFF" />}
                    />

                    <InformationBox
                        unified
                        label="Temperatura Central"
                        iconZoneColor="#ec407a"
                        value={vetCaseDetails?.pet_anamnesis?.rectal_temperature}
                        icon={() => <FontAwesome name="thermometer-three-quarters" size={21} color="#FFF" />}
                    />

                    <InformationBox
                        unified
                        label="Temperatura Periférica"
                        iconZoneColor="#ec407a"
                        value={vetCaseDetails?.pet_anamnesis?.peripheral_temperature}
                        icon={() => <FontAwesome name="thermometer-three-quarters" size={21} color="#FFF" />}
                    />

                    <InformationBox
                        unified
                        label="Mucosas"
                        iconZoneColor="#42a5f5"
                        value={vetCaseDetails?.pet_anamnesis?.mucous}
                        icon={() => <Entypo name="water" size={18} color="#FFF" />}
                    />

                    <InformationBox
                        unified
                        iconZoneColor="#7e57c2"
                        label="Saturação Arterial"
                        value={`${vetCaseDetails?.pet_anamnesis?.oximetria || "---"} %`}
                        icon={() => <FontAwesome5 name="percentage" size={18} color="#FFF" />}
                    />

                    <InformationBox
                        unified
                        iconZoneColor="#ffa726"
                        label="Lactato"
                        value={`${vetCaseDetails?.pet_anamnesis?.lactato || "---"} mmol/L`}
                        icon={() => <Entypo name="area-graph" size={18} color="#FFF" />}
                    />

                    <InformationBox
                        unified
                        label="Glicemia"
                        iconZoneColor="#00796b"
                        value={`${vetCaseDetails?.pet_anamnesis?.glicemia || "---"} mg/dL`}
                        icon={() => <AntDesign name="piechart" size={18} color="#FFF" />}
                    />

                    <InformationBox
                        unified
                        label="Hematócrito"
                        iconZoneColor="#7e57c2"
                        value={`${vetCaseDetails?.pet_anamnesis?.hematocrito || "---"} %`}
                        icon={() => <FontAwesome5 name="percentage" size={18} color="#FFF" />}
                    />

                    <InformationBox
                        unified
                        label="Proteínas Totais"
                        iconZoneColor="#f44336"
                        value={`${vetCaseDetails?.pet_anamnesis?.total_proteins || "---"} g/L`}
                        icon={() => <AntDesign name="sharealt" size={18} color="#FFF" />}
                    />

                    <InformationBox
                        unified
                        label="Plaquetas"
                        iconZoneColor="#2196f3"
                        value={`${vetCaseDetails?.pet_anamnesis?.plaquetas_quantity || "---"} g/dL`}
                        icon={() => <AntDesign name="dotchart" size={18} color="#FFF" />}
                    />

                    <InformationBox
                        unified
                        borderBottom
                        label="Albumina"
                        iconZoneColor="#9fa8da"
                        value={`${vetCaseDetails?.pet_anamnesis?.albumina || "---"} g/dL`}
                        icon={() => <Entypo name="lab-flask" size={18} color="#FFF" />}
                    />

                    <SectionTitle value={"SBAR (Situação)"} />

                    <DetailedInformationBox
                        label="Background"
                        iconZoneColor="#ff9800"
                        value={vetCaseDetails?.pet_anamnesis.background}
                        icon={() => <FontAwesome5 name="history" size={18} color="#FFF" />}
                    />

                    <DetailedInformationBox
                        label="Atitudes"
                        iconZoneColor="#2196f3"
                        value={vetCaseDetails?.pet_anamnesis.activity}
                        icon={() => <FontAwesome5 name="hand-holding-medical" size={18} color="#FFF" />}
                    />

                    <DetailedInformationBox
                        label="Como podemos lhe ajudar?"
                        iconZoneColor="#5c6bc0"
                        value={vetCaseDetails?.pet_anamnesis.recomendations}
                        icon={() => <FontAwesome5 name="hands-helping" size={18} color="#FFF" />}
                    />
                </SpaceArea>
            </ScrollView>
        </ScreenView>
    )
}

