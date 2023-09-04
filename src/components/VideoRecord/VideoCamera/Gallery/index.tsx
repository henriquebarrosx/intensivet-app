import React from 'react';
import * as ImagePicker from 'expo-image-picker';
import { View, TouchableOpacity, Image } from 'react-native';

import { styles } from './styles';
import { useVideoCamera } from '../../../../context/RecordVideo';

interface Props {
    pickVideoUriFromGallery: (videoSourceUri: string) => void;
}

export const GalleryButton = ({ pickVideoUriFromGallery }: Props) => {
    const { galleryMedia } = useVideoCamera();
    const lastGalleryMedia = galleryMedia[0];

    const pickMediaFromGallery = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
            selectionLimit: 1,
            aspect: [16, 9],
            quality: 1,
        });

        if (result.canceled) return
        pickVideoUriFromGallery(result.assets[0].uri)
    }

    return (
        <View style={styles.galleryArea}>
            <TouchableOpacity onPress={pickMediaFromGallery} style={styles.galleryButton}>
                {!!galleryMedia.length ? (
                    <Image
                        style={styles.lastGalleryMediaImg}
                        source={{ uri: lastGalleryMedia.uri }}
                    />
                ) : null}
            </TouchableOpacity>
        </View>
    )
}