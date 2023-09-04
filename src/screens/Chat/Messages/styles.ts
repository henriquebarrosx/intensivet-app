import { Platform, StyleSheet } from "react-native"; 
import colors from "../../../utils/colors";

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.snow,
  },
  virtualizedList: {
    /*
      No android a lista invertida possui sérios problemas de performance!
      Uma "Solução" encontrada foi inverter usando o atribute scaleY, porém ele
      encontra depreciado, passando a ser chamado através do atributo 
      transform: [{ scaleY: -1 }].

      O problema em utilizar este atributo é que ele também causa o mesmo problema
      de performance!

      https://github.com/facebook/react-native/issues/30034#issuecomment-780547496
    */ 
    scaleY: -1,
  },
  footerArea: {
    position: 'relative',
  },
});