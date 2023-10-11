import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    root: {
        width: 250,
        height: 250,
        paddingVertical: 8,
        paddingHorizontal: 8,
        position: "relative",
        justifyContent: "center",
    },
    loader: {
        zIndex: 999,
        top: "50%",
        right: "50%",
        bottom: "50%",
        position: "absolute",
    },
    image: {
        width: 230,
        height: 240,
        borderWidth: 0,
        borderRadius: 6,
        alignSelf: "center",
        borderColor: "transparent",
    },
    progress: {
        marginTop: 20,
        alignSelf: "center",
        position: "absolute",
    },
})