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

    async function unloadAsync(event: VideoFullscreenUpdateEvent) {
        if (event.fullscreenUpdate === VideoFullscreenUpdate.PLAYER_WILL_DISMISS) {
            logger.info("VIDEO PLAYER", "unloading video player...")
            await video?.current?.unloadAsync()
            await video?.current?.stopAsync()
            onFinish()
        }
    }

    useEffect(() => {
        (async () => {
            logger.info("VIDEO PLAYER", "loading video player...")
            await video?.current?.playAsync()
            if (isFullScreen) await video.current.presentFullscreenPlayer()
        })()

        return () => {
            (async () => {
                if (!isFullScreen) {
                    await video?.current?.unloadAsync()
                    await video?.current?.stopAsync()
                    onFinish()
                }
            })()
        }
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
                onFullscreenUpdate={unloadAsync}
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