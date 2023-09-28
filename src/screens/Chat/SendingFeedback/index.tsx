import React from "react"; ""
import { View } from "react-native"

import { styles } from "./styles"
import { LoadingIndicator } from "../../../components/LoadingIndicator"

type Props = {
    isVisible: boolean
}

export function SendingLoadingFeedback({ isVisible }: Props) {
    return (
        <View style={styles.container}>
            <LoadingIndicator isLoading={isVisible} color="#757575" />
        </View>
    )
}
