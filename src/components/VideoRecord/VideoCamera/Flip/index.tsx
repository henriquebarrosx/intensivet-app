import React from 'react';
import { Camera } from 'expo-camera';
import { Feather } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';

import { styles } from './styles';
import { useVideoCamera } from '../../../../context/RecordVideo';

export const FlipCamera = () => {
  const { changeCameraType } = useVideoCamera();

  const flipCamera = () => {
    const back = Camera.Constants.Type.back;
    const front = Camera.Constants.Type.front;
    changeCameraType(cameraType =>  cameraType === back ? front : back)
  }

  return (
    <View style={styles.contentArea}>
      <TouchableOpacity onPress={flipCamera}>
        <Feather name="refresh-ccw" size={24} color={'white'} />
      </TouchableOpacity>
    </View>
  )
}