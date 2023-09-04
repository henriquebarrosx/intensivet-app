import Constants from "expo-constants";
import { Platform, StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: "flex-end",
  },
  content: {
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
  picture: {
    flex: 1,
    width: "100%",
    borderRadius: 6,
    maxWidth: Dimensions.get("window").width,
    maxHeight: Dimensions.get("window").height,
  },
});