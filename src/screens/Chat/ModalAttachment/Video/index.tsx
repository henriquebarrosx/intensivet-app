import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { styles } from './styles';
import { useViewModel } from './viewModel';

export const VideoButton = () => {
  const { recordVideo } = useViewModel();

  return (
    <View style={styles.optionContainer}>
      <TouchableOpacity onPress={recordVideo} style={styles.button}>
        <MaterialCommunityIcons size={24} name="video" color={'#FFF'} />
      </TouchableOpacity>

      <Text>Vídeo</Text>
    </View>
  );
};
