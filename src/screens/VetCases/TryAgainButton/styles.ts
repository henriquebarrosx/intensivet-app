import { StyleSheet } from 'react-native';
import colors from "../../../utils/colors";
import { heightPercentageToDP } from "../../../utils/responsivity";

export const styles = StyleSheet.create({
  tryAgainBtn: {
    height: 58,
    borderRadius: 7,
    fontWeight: '600',
    alignSelf: 'center',
    alignItems: 'center',
    marginHorizontal: 24,
    position: 'absolute',
    justifyContent: 'center',
    top: heightPercentageToDP('25'),
  },
  tryAgainText: {
    fontSize: 18,
    color: colors.primary,
  },
});
