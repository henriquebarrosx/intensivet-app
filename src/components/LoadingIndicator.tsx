import React, { Fragment } from "react"
import { StyleSheet, View, ActivityIndicator } from "react-native"

interface Props {
    color?: string
    isLoading: boolean
}

export function LoadingIndicator(props: Props) {
    const { isLoading, color = '#F5F5F5' } = props

    return (
        <Fragment>
            {isLoading && (
                <View style={styles.container}>
                    <ActivityIndicator size={28} color={color} />
                </View>
            )}
        </Fragment>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 30,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }
})