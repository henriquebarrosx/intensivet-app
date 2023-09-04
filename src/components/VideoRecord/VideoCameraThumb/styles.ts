import { StyleSheet } from "react-native";
import colors from "../../../utils/colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
    buttonsContainer: {
        height: 150,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    button: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: colors.white,
        fontWeight: 'bold',
    }
});