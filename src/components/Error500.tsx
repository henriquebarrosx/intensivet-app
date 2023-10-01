import React, { memo } from "react"
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native"

import colors from "../utils/colors"
import { useVetCasesContext } from "../context/VetCasesContext"
import FallbackImage from "../../assets/images/error.png"
import { useErrorsFeedback } from "../context/ErrorsFeedbackContext"

const SomethingWentWrong = () => {
    const vetCasesContext = useVetCasesContext()
    const { closeUnexpectedErrorModal } = useErrorsFeedback()

    async function onTryAgainTap() {
        closeUnexpectedErrorModal({ toRefresh: true })
        vetCasesContext.findAll()
    }

    return (
        <View style={styles.root}>
            <Image style={styles.fallbackPicture} source={FallbackImage} />

            <Text allowFontScaling={false} style={styles.title}>
                Algo deu errado!
            </Text>

            <Text allowFontScaling={false} style={styles.errorMessage}>
                {`Estamos trabalhando para criar algo melhor.${"\n"}Não vamos demorar!`}
            </Text>

            <TouchableOpacity onPress={onTryAgainTap} style={styles.tryAgainBtn}>
                <Text allowFontScaling={false} style={styles.tryAgainText}>Tentar Novamente</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        alignItems: "center",
    },
    fallbackPicture: {
        width: 300,
        height: 300,
        marginTop: 24,
        marginBottom: 12,
    },
    title: {
        fontSize: 32,
        lineHeight: 48,
        fontWeight: "600",
        textAlign: "center",
    },
    errorMessage: {
        fontSize: 16,
        lineHeight: 24,
        color: colors.gray,
        textAlign: "center",
    },
    tryAgainBtn: {
        height: 58,
        borderRadius: 7,
        fontWeight: "600",
        marginVertical: 50,
        alignItems: "center",
        marginHorizontal: 24,
        alignSelf: "stretch",
        justifyContent: "center",
        backgroundColor: colors.primary,
    },
    tryAgainText: {
        fontSize: 18,
        color: colors.white,
    },
})

export default memo(SomethingWentWrong)