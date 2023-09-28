import React, { useState } from "react"
import { View, Image, StyleSheet, Dimensions, ImageProps, ImageResizeMode, ActivityIndicator } from "react-native"

import DefaultImage from "../../assets/images/blur-image.avif"
import FallbackImage from "../../assets/images/default-fallback-image.png"

type Props = {
    uri: string
    resizeMode: ImageResizeMode
}

// https://github.com/react-native-netinfo/react-native-netinfo

export default function ImageView({ uri, resizeMode }: Props) {
    const [closedProgress, setProgress] = useState<boolean>(true)
    const [thumbnail, setResource] = useState<ImageProps | any>({ uri })

    function closeProgress() {
        setProgress(false)
    }

    function onError() {
        setProgress(false)
        setResource(FallbackImage)
    }

    return (
        <View style={styles.content}>
            {closedProgress &&
                <ActivityIndicator
                    color="#FFFFFF"
                    style={styles.progress}
                />
            }

            <Image
                onError={onError}
                source={thumbnail}
                style={styles.picture}
                resizeMode={resizeMode}
                onLoadEnd={closeProgress}
                defaultSource={DefaultImage}
                progressiveRenderingEnabled
            />
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    picture: {
        flex: 1,
        width: "100%",
        borderRadius: 6,
        maxWidth: Dimensions.get("window").width,
        maxHeight: Dimensions.get("window").height,
    },
    progress: {
        zIndex: 999,
        alignSelf: "center",
        position: "absolute",
    },
});
