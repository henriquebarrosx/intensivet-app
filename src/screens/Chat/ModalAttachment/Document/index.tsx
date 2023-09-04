import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { styles } from './styles';
import { useViewModel } from './viewModel';

export const DocumentButton = () => {
  const { uploadDocumentFile } = useViewModel();
 
  return (
    <View style={styles.optionContainer}>
      <TouchableOpacity onPress={uploadDocumentFile} style={styles.button}>
        <MaterialCommunityIcons size={24} name="file-document" color={'#FFF'} />
      </TouchableOpacity>

      <Text>Documento</Text>
    </View>
  );
};
