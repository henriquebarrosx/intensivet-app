import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { styles } from './styles';

export const CloseCamera = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.buttonArea}>
      <AntDesign name="close" size={24} color={'white'} />
    </TouchableOpacity>
  )
}
