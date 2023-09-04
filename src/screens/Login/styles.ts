import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { globalStyles } from "../../utils/globalStyle";

export const styles = StyleSheet.create({
  imgLogo: {
    width: 250,
    height: 80,
  },
  textName: {
    fontSize: 18,
    color: colors.white,
  },
  container: {
    flex: 1,
    width: "90%",
    paddingBottom: 50,
    alignContent: "center",
  },
  containerLogo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    flex: 1,
    alignSelf: 'center',
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  input: {
    padding: 10,
    fontSize: 17,
    color: "#222",
    borderWidth: 1,
    marginTop: 12,
    marginBottom: 6,
    borderRadius: 7,
    borderColor: '#ccc',
    backgroundColor: colors.white,
  },
  validation: {
    paddingLeft: 10,
    color: colors.danger,
  },
  btnRegister: {
    alignItems: "center",
    justifyContent: "center",
  },
  registerText: {
    color: globalStyles.common.white,
  },
})
