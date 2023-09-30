import React, { useEffect, useRef, useState } from "react"
import { Text, StyleSheet, Animated } from "react-native"
import { useNetwork } from "../context/NetworkContext"

export default function NetworkConnection() {
    const { isConnected } = useNetwork()

    const heightAnimation = useRef(new Animated.Value(0)).current
    const message = isConnected ? "Conectado" : "Sem conexão"
    const [isVisible, shouldDisplay] = useState(false)

    const bgColor = heightAnimation.interpolate({
        inputRange: [0, 72],
        outputRange: ["#424242", isConnected ? "#aed581" : "#424242"]
    })

    useEffect(() => {
        if (isConnected) {
            Animated.timing(heightAnimation, {
                duration: 200,
                delay: 2500,
                useNativeDriver: false,
                toValue: 0,
            }).start()
        }

        else {
            Animated.timing(heightAnimation, {
                duration: 200,
                useNativeDriver: false,
                toValue: 54
            }).start()
        }
    }, [isConnected])

    useEffect(() => {
        heightAnimation.addListener((state) => {
            shouldDisplay(state.value !== 0)
        })
    }, [])

    return isVisible ? (
        <Animated.View
            style={[
                styles.container,
                {
                    height: heightAnimation,
                    backgroundColor: bgColor,
                }
            ]}>
            <Text style={styles.message}>{message}</Text>
        </Animated.View>
    ) : null
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingTop: 16,
        justifyContent: "flex-start",
    },
    message: {
        color: "#FFF",
        fontWeight: "700",
        textAlign: "center",
    }
})
