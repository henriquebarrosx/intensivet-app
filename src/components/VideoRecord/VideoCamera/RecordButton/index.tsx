import React from "react"
import { Camera } from "expo-camera"
import { View, TouchableOpacity } from "react-native"

import { styles } from "./styles"
import { logger } from "../../../../infra/adapters"
import { useVideoCamera } from "../../../../context/RecordVideo"

interface Props {
    recordVideoCamera: (isRecording: boolean) => void
    onVideoComplete: (videoSourceUri: string) => void
}

export const RecordButton = ({ onVideoComplete, recordVideoCamera }: Props) => {
    const { isCameraReady, cameraRef } = useVideoCamera()

    const recordVideo = async () => {
        if (cameraRef.current) {
            try {
                const options = { maxDuration: 60, quality: Camera.Constants.VideoQuality["480"] }
                const videoRecordPromise = cameraRef.current?.recordAsync(options)
                recordVideoCamera(true)

                if (videoRecordPromise) {
                    const data = await videoRecordPromise
                    onVideoComplete(data.uri)
                    recordVideoCamera(false)
                    return
                }
            }

            catch (error) {
                logger.error("VIDEO RECORD", "Something wrong when recording video", { cause: error })
                recordVideoCamera(false)
            }
        }
    }

    const stopVideo = async () => {
        cameraRef && cameraRef.current?.stopRecording()
        recordVideoCamera(false)
    }

    return (
        <View style={styles.recordVideoArea}>
            <TouchableOpacity
                onPressOut={stopVideo}
                onLongPress={recordVideo}
                disabled={!isCameraReady}
                style={styles.recordVideoButton}
            />
        </View>
    )
}