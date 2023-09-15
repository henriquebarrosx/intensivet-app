import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    root: {
        maxHeight: 250,
        paddingVertical: 8,
        paddingHorizontal: 8,
        justifyContent: "center",
    },
    image: {
        height: 220,
        minWidth: 250,
        borderWidth: 0,
        borderRadius: 6,
        maxWidth: "100%",
        borderColor: "transparent",
    },
    progress: {
        marginTop: 20,
        alignSelf: "center",
        position: "absolute",
    },
})