import { View } from 'react-native';
import { Camera } from "expo-camera";
import React, { useState } from "react";
import { useIsFocused } from '@react-navigation/core';

import { styles } from './styles';
import { FlipCamera } from "./Flip";
import { StopWatch } from "./StopWatch";
import { GalleryButton } from "./Gallery";
import { CloseCamera } from "./CloseCamera";
import { RecordButton } from "./RecordButton";
import { useVideoCamera } from "../../../context/RecordVideo";

interface Props {
    onComplete: (videoSourceUri: string) => void;
}

const VideoCamera = ({ onComplete }: Props) => {
    const isFocused = useIsFocused();
    const [isRecording, setAsRecording] = useState(false);
    const { cameraType, cameraRef, setCameraAsReady } = useVideoCamera();

    const cameraAsReady = () => {
        setCameraAsReady(true)
    }

    return (
        <View style={styles.container}>
            {isFocused ?
                <Camera
                    ratio={'16:9'}
                    ref={cameraRef}
                    type={cameraType}
                    style={styles.camera}
                    onCameraReady={cameraAsReady}
                />
                : null}

            <View style={styles.topSideArea}>
                <CloseCamera />
                <StopWatch isRecording={isRecording} />
            </View>

            <View style={styles.bottomBarContainer}>
                <GalleryButton pickVideoUriFromGallery={onComplete} />

                <RecordButton
                    onVideoComplete={onComplete}
                    recordVideoCamera={setAsRecording}
                />

                <FlipCamera />
            </View>
        </View>
    );
};

export default VideoCamera;
