import { Camera, CameraType } from 'expo-camera';
import React, { createContext, Dispatch, SetStateAction, useContext, useRef, useState } from 'react';

import * as MediaLibrary from 'expo-media-library';
import { WithChildren } from '../@types/common';

interface ContextSchema {
    isCameraReady: boolean;
    cameraType: CameraType;
    galleryMedia: MediaLibrary.Asset[];
    cameraRef: React.MutableRefObject<any>;
    setCameraAsReady: Dispatch<SetStateAction<boolean>>;
    insertLastMediaLibraryIntoGalleryButton: () => Promise<void>;
    changeCameraType: Dispatch<SetStateAction<'front' | 'back'>>;
    setGalleryMedia: Dispatch<SetStateAction<MediaLibrary.Asset[]>>;
}

const RecordVideoContext = createContext({} as ContextSchema);

export const RecordVideoProvider = ({ children }: WithChildren) => {
    const cameraRef = useRef<any>();
    const [isCameraReady, setCameraAsReady] = useState(false);
    const [galleryMedia, setGalleryMedia] = useState<MediaLibrary.Asset[]>([]);
    const [cameraType, changeCameraType] = useState<CameraType>(CameraType.back);

    async function insertLastMediaLibraryIntoGalleryButton() {
        const galleryMediaConfig: MediaLibrary.AssetsOptions = { sortBy: ['creationTime'], mediaType: ['video'] };
        const userGalleryMedia = await MediaLibrary.getAssetsAsync(galleryMediaConfig);
        setGalleryMedia(userGalleryMedia.assets);
    }

    return (
        <RecordVideoContext.Provider
            value={{
                cameraType,
                changeCameraType,
                galleryMedia,
                setGalleryMedia,
                isCameraReady,
                setCameraAsReady,
                cameraRef,
                insertLastMediaLibraryIntoGalleryButton,
            }}>
            {children}
        </RecordVideoContext.Provider>
    )
}

export const useVideoCamera = (): ContextSchema => {
    const context = useContext(RecordVideoContext);

    if (context) {
        return context;
    }

    throw new Error('O uso do hook useVideoCamera só é válido quando abraçado pelo RecordVideoProvider')
}