import { Platform, StyleSheet } from "react-native";
import colors from "../../utils/colors";

export const styles = StyleSheet.create({
  container: {
    height: 120,
    paddingTop: 20,
    paddingHorizontal: 24,
    borderTopColor: '#bdbdbd',
    backgroundColor: colors.white,
    borderTopWidth: Platform.OS == 'android' ? 1 : 0.4,
  },
  content: {
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  recordFeedback: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  animationArea: {
    width: 150,
    height: 150,
    marginLeft: 21,
  },
  stopWatchText: {
    fontSize: 18,
  },
  onSend: {
    width: 38,
    height: 38,
    paddingLeft: 6,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  }
});