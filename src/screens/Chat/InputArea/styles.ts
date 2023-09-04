import { Platform, StyleSheet } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import colors from '../../../utils/colors';
import { INPUT_AREA_HEIGHT } from './viewModel';

export const styles = StyleSheet.create({
  root: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopColor: '#bdbdbd',
    backgroundColor: colors.snow,
    marginBottom: getBottomSpace(),
    justifyContent: 'space-between',
    borderTopWidth: Platform.OS == 'android' ? 1 : 0.4,
  },
  leftSide: {
    flex: 1,
    marginHorizontal: 10,
  },
  inputText: {
    minHeight: 35,
    maxHeight: 110,
    borderWidth: 0.5,
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 12,
    borderColor: '#bdbdbd',
    backgroundColor: colors.white,
  },
});

