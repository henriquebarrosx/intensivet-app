import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { styles } from './styles';
import { useViewModel } from './viewModel';

export const CameraButton = () => {
    const { uploadAssetFromCamera } = useViewModel()

    return (
        <View style={styles.optionContainer}>
            <TouchableOpacity onPress={uploadAssetFromCamera} style={styles.button}>
                <MaterialCommunityIcons size={24} name="camera" color={'#FFF'} />
            </TouchableOpacity>

            <Text>Câmera</Text>
        </View>
    );
}