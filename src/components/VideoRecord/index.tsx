import { StatusBar } from 'expo-status-bar'
import * as ImagePicker from 'expo-image-picker'
import VideoCameraComponent from './VideoCamera'
import { VideoCameraThumb } from "./VideoCameraThumb"
import { useVideoCamera } from "../../context/RecordVideo"
import React, { Fragment, useState, useEffect } from "react"

interface Props {
    onComplete: (assetMedia: string) => void
}

const VideoRecord = ({ onComplete }: Props) => {
    const [assetMedia, onVideoComplete] = useState("")
    const { insertLastMediaLibraryIntoGalleryButton } = useVideoCamera()

    const confirmVideoRecord = (isConfirmed: boolean): void => {
        isConfirmed ? onComplete(assetMedia) : onVideoComplete('')
    }

    useEffect(() => {
        insertLastMediaLibraryIntoGalleryButton()
    }, [])

    return (
        <Fragment>
            <StatusBar style={'light'} translucent />

            {!!assetMedia
                ? <VideoCameraThumb thumbUri={assetMedia} onConfirm={confirmVideoRecord} />
                : <VideoCameraComponent onComplete={onVideoComplete} />
            }
        </Fragment>
    )
}

export default VideoRecord