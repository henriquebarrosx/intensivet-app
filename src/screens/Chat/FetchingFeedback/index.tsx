import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import { styles } from './styles';

interface Props {
  isVisible: boolean;
}

export const FetchingLoadingFeedback = ({ isVisible }: Props) => {
  if (isVisible) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={24} color={"#757575"} />
      </View>
    )
  }

  return null;
}
