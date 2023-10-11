import React, { useState } from "react"
import { ActivityIndicator, TouchableOpacity, View } from "react-native"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

import { styles } from "./styles"
import ImageView from "../../../../components/ImageView"
import { Message } from "../../../../domain/entities/message"
import { useFileReader } from "../../../../app/react-hooks/file-reader"

type Props = {
    message: Message
}

export function VideoView({ message }: Props) {
    const fileReader = useFileReader()
    const [isOpening, shouldDisplayLoader] = useState(false)

    async function onPress(): Promise<void> {
        shouldDisplayLoader(true)
        await fileReader.read(message.attachment.name, message.attachment.uri)
        shouldDisplayLoader(false)
    }

    return (
        <TouchableOpacity onPress={onPress} style={styles.root}>
            <View style={styles.image}>
                <ImageView uri={message.attachment.preview} resizeMode="cover" />

                <View style={styles.playButtonContainer}>
                    {isOpening
                        ? <ActivityIndicator size={28} />
                        : <MaterialCommunityIcons size={30} name="play" color={"#FFFFFF"} style={styles.icon} />
                    }
                </View>
            </View>
        </TouchableOpacity>
    )
}
