import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    root: {
        position: "relative",
        width: 250,
        height: 250,
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
    playButtonContainer: {
        top: "40%",
        right: "42%",
        width: 50,
        height: 50,
        opacity: 0.8,
        borderRadius: 100,
        alignSelf: "center",
        position: "absolute",
        justifyContent: 'center',
        backgroundColor: '#000000'
    },
    icon: {
        alignSelf: "center",
    },
    progress: {
        marginTop: 20,
        alignSelf: "center",
        position: "absolute",
    },
});