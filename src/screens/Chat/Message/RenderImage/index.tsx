import React from "react"
import { TouchableOpacity, View } from "react-native"

import { styles } from "./styles"
import ImageView from "../../../../components/ImageView"
import { Message } from "../../../../domain/entities/message"
import { useFileReader } from "../../../../app/react-hooks/file-reader"

type Props = {
    message: Message
}

export default function RenderImage({ message }: Props) {
    const fileReader = useFileReader()

    async function previewImage(): Promise<void> {
        await fileReader.read(message.attachment.name, message.attachment.uri)
    }

    return (
        <TouchableOpacity style={styles.root} onPress={previewImage}>
            <View style={styles.image}>
                <ImageView uri={message.attachment.uri} resizeMode="cover" />
            </View>
        </TouchableOpacity>
    )
}
