import React, { useEffect } from "react"
import { useIsFocused } from "@react-navigation/native"
import { ScrollView, ActivityIndicator } from "react-native"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

import { useViewModel } from "./viewModel"
import ScreenView from "../../components/ScreenView"
import { Container, Evidence, EvidencesNotFound, AbsoluteArea, Description } from "./styles"

export function EvidencesScreen() {
    const isCurrentScreenFocused = useIsFocused()

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
            fetchVetCaseDetails()
        }
    }, [isCurrentScreenFocused])

    return (
        <ScreenView>
            {isFetchingEvidences &&
                <AbsoluteArea>
                    <ActivityIndicator size={32} color="#757575" />
                </AbsoluteArea>
            }

            {isEvidencesNotFoundTextVisible &&
                <EvidencesNotFound>Nenhuma evidência encontrada</EvidencesNotFound>
            }

            <ScrollView style={{ flex: 1 }}>
                <Container>
                    {evidences.map((evidence) => (
                        <Evidence
                            key={evidence.service_url}
                            onPress={() => openEvidenceFile(evidence.service_url)}
                        >
                            <MaterialCommunityIcons
                                size={32}
                                color={"#FFF"}
                                name={getEvidenceIcon(evidence)}
                            />

                            <Description ellipsizeMode="tail" numberOfLines={1}>
                                {/* TODO: Adicionar nome do arquivo */}
                                {new Date().toISOString()}
                            </Description>
                        </Evidence>
                    ))}
                </Container>
            </ScrollView>
        </ScreenView>
    )
}
