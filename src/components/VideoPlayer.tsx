import React, { useEffect } from "react"
import { ResizeMode, Video } from "expo-av"
import { View, StyleSheet } from "react-native"

type Props = {
    uri: string
}

// https://docs.expo.dev/versions/latest/sdk/video/

export default function VideoPlayer({ uri }: Props) {
    const video = React.useRef<Video>(null)

    useEffect(() => {
        video?.current?.playAsync()
        return () => {
            Promise.all(
                [
                    video?.current?.stopAsync(),
                    video?.current?.unloadAsync()
                ]
            )
        }
    }, [])

    return (
        <View style={styles.container}>
            <Video
                isLooping
                ref={video}
                shouldPlay
                source={{ uri }}
                useNativeControls
                style={styles.video}
                resizeMode={ResizeMode.CONTAIN}
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