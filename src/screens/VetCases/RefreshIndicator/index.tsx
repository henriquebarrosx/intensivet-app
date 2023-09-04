import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { UIActivityIndicator } from "react-native-indicators";

import colors from '../../../utils/colors';
import { useVetCaseIndicators } from '../../../context/VetCaseIndicators';
import { heightPercentageToDP, widthPercentageToDP } from '../../../utils/responsivity';

const RefreshIndicator = memo(() => {
  const { isRefreshingVetCaseList } = useVetCaseIndicators();

  if (isRefreshingVetCaseList) {
    return (
      <View style={styles.containter}>
        <UIActivityIndicator color={colors.gray} size={32} />
      </View>
    )
  }

  return null;
});

const styles = StyleSheet.create({
  containter: {
    position: 'absolute',
    top: heightPercentageToDP('30'),
    left: widthPercentageToDP('50'),
    right: widthPercentageToDP('50'),
  },
});

export default RefreshIndicator;