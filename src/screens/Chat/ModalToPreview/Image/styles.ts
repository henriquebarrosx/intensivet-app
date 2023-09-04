import Constants from "expo-constants";
import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: "flex-end",
  },
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#000",
    justifyContent: "space-evenly",
    paddingTop: Platform.OS === 'ios' ? Constants.statusBarHeight : 0,
  },
  header: {
    height: 45,
    marginTop: 16,
    alignItems: "center",
    flexDirection: "row",
  },
  headerRightSide: {
    marginLeft: 24,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  doctorName: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  timestamp: {
    marginTop: 6,
    color: "#FFFFFF",
  },
});