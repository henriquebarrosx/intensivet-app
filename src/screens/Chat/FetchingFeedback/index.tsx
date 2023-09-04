import React from 'react';
import { View } from 'react-native';

import { styles } from './styles';
import { UIActivityIndicator } from 'react-native-indicators';

interface Props {
  isVisible: boolean;
}

export const FetchingLoadingFeedback = ({ isVisible } : Props) => {
  if (isVisible) {
    return (
      <View style={styles.container}>
        <UIActivityIndicator size={24} color={"#757575"} />
      </View>
    )
  }

  return null;
}
