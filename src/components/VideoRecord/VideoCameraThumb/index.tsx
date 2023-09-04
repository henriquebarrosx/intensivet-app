import React from 'react';
import { styles } from './styles';
import VideoPlayer from '../../VideoPlayer';
import { Text, TouchableOpacity, View } from 'react-native';

interface Props {
    thumbUri: string;
    onConfirm: (confirmed: boolean) => void;
}

export const VideoCameraThumb = ({ thumbUri, onConfirm }: Props) => {
    return (
        <View style={styles.container}>
            <VideoPlayer uri={thumbUri} />

            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button} onPress={() => onConfirm(false)}>
                    <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => onConfirm(true)}>
                    <Text style={styles.buttonText}>Confirmar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}