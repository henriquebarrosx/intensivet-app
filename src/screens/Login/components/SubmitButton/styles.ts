import { StyleSheet } from "react-native";
import colors from "../../../../utils/colors";

export const styles = StyleSheet.create({
  buttonArea: {
    height: 58,
    borderRadius: 7,
    marginVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
  buttonText: {
    fontSize: 18,
    color: colors.white,
  },
});