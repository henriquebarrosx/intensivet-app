import React from "react"
import { StyleSheet, View, ActivityIndicator } from "react-native"

import colors from "../../../utils/colors"
import { useVetCasesContext } from "../../../context/VetCasesContext"
import { heightPercentageToDP, widthPercentageToDP } from "../../../utils/responsivity"

export default function RefreshIndicator() {
    const vetCasesContext = useVetCasesContext()

    return vetCasesContext.isLoading ? (
        <View style={styles.containter}>
            <ActivityIndicator color={colors.gray} size={32} />
        </View>
    ) : null
}

const styles = StyleSheet.create({
    containter: {
        position: "absolute",
        top: heightPercentageToDP("30"),
        left: widthPercentageToDP("50"),
        right: widthPercentageToDP("50"),
    },
})
