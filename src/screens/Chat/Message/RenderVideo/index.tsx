import React from "react"
import { TouchableOpacity, View } from "react-native"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

import { styles } from "./styles"
import ImageView from "../../../../components/ImageView"
import { Message } from "../../../../domain/entities/message"
import { useFileReader } from "../../../../app/react-hooks/file-reader"

type Props = {
    message: Message
}

export default function RenderVideoThumbnail({ message }: Props) {
    const fileReader = useFileReader()

    async function previewImage(): Promise<void> {
        await fileReader.read(message.attachment.name, message.attachment.uri)
    }

    return (
        <TouchableOpacity style={styles.root} onPress={previewImage}>
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
        </TouchableOpacity>
    )
}
