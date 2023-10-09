import React, { memo, useState } from "react"
import { TouchableOpacity, View } from "react-native"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

import { styles } from "./styles"
import ImageView from "../../../../components/ImageView"
import VideoPlayer from "../../../../components/VideoPlayer"
import { Message } from "../../../../domain/entities/message"

type Props = {
    message: Message
}

function RenderVideoThumbnail({ message }: Props) {
    const [isFullScreen, shouldDisplayFullScreen] = useState(false)

    function toggleFullScreen(): void {
        shouldDisplayFullScreen((isVisible) => !isVisible)
    }

    return (
        <TouchableOpacity style={styles.root} onPress={() => toggleFullScreen()}>
            <View style={styles.image}>
                <ImageView uri={message.attachment.preview} resizeMode="cover" />

                <View style={styles.playButtonContainer}>
                    <MaterialCommunityIcons
                        size={30}
                        name="play"
                        color={"#FFFFFF"}
                        style={styles.icon}
                    />
                </View>
            </View>

            {isFullScreen && (
                <View style={styles.videoContainer}>
                    <VideoPlayer
                        isFullScreen
                        uri={message.attachment.uri}
                        onFinish={() => toggleFullScreen()}
                    />
                </View>
            )}
        </TouchableOpacity>
    )
}

export default memo(RenderVideoThumbnail)
