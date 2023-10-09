import React, { useEffect } from "react"
import { View, StyleSheet } from "react-native"
import { ResizeMode, Video, VideoFullscreenUpdate, VideoFullscreenUpdateEvent } from "expo-av"

import { logger } from "../infra/adapters/logger-adapter"

type Props = {
    uri: string
    isFullScreen?: boolean
    onFinish?: () => void
}

// https://docs.expo.dev/versions/latest/sdk/video/

export default function VideoPlayer({ uri, isFullScreen, onFinish = () => { } }: Props) {
    const video = React.useRef<Video>(null)

    async function loadAsync() {
        logger.info("VIDEO PLAYER", "loading video player...")
        await video?.current?.playAsync()

        if (isFullScreen) {
            logger.info("VIDEO PLAYER", "opening full screen...")
            await video.current.presentFullscreenPlayer()
        }
    }

    async function exitFromFullScreen(event: VideoFullscreenUpdateEvent) {
        if (event.fullscreenUpdate === VideoFullscreenUpdate.PLAYER_WILL_DISMISS) {
            logger.info("VIDEO PLAYER", "exiting from full screen...")
            await unloadAsync()
        }
    }

    async function unloadAsync() {
        logger.info("VIDEO PLAYER", "unloading video player...")
        await video?.current?.unloadAsync()
        await video?.current?.stopAsync()
        onFinish()
    }

    useEffect(() => {
        loadAsync()
        return () => { unloadAsync() }
    }, [])

    return (
        <View style={styles.container}>
            <Video
                ref={video}
                shouldPlay
                source={{ uri }}
                useNativeControls
                style={styles.video}
                resizeMode={ResizeMode.CONTAIN}
                onFullscreenUpdate={exitFromFullScreen}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: '#ecf0f1',
    },
    video: {
        flex: 1,
    },
})