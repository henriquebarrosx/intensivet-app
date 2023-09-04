import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { styles } from './styles';
import { useViewModel } from './viewModel';

export const GalleryButton = () => {
    const { uploadGalleryAssetMedia } = useViewModel();
    const buttonStyle = [styles.button, { backgroundColor: '#B967EC' }];

    return (
        <View style={styles.optionContainer}>
            <TouchableOpacity onPress={uploadGalleryAssetMedia} style={buttonStyle}>
                <MaterialCommunityIcons size={24} name="panorama" color={'#FFF'} />
            </TouchableOpacity>

            <Text>Galeria</Text>
        </View>
    );
}
