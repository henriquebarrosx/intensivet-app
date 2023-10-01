import React from "react"
import { TouchableOpacity, Text } from "react-native"

import { styles } from "./styles"
import { useVetCasesContext } from "../../../context/VetCasesContext"
import { useVetCaseIndicators } from "../../../context/VetCaseIndicators"
import { useErrorsFeedback } from "../../../context/ErrorsFeedbackContext"

export default function TryAgainButton() {
    const vetCasesContext = useVetCasesContext()
    const { closeUnexpectedErrorModal } = useErrorsFeedback()
    const { isTryAgainButtonVisible } = useVetCaseIndicators()

    async function refreshVetCaseList(): Promise<void> {
        closeUnexpectedErrorModal({ toRefresh: true })
        await vetCasesContext.findAll()
    }

    return isTryAgainButtonVisible ? (
        <TouchableOpacity onPress={refreshVetCaseList} style={styles.tryAgainBtn}>
            <Text allowFontScaling={false} style={styles.tryAgainText}>
                Tentar Novamente
            </Text>
        </TouchableOpacity>
    ) : null
}
