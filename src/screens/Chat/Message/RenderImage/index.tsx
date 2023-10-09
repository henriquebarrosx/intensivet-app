import React, { useContext } from "react"
import * as FileSystem from "expo-file-system"
import * as IntentLauncher from "expo-intent-launcher"
import { Platform, TouchableOpacity, View } from "react-native"

import { styles } from "./styles"
import ImageView from "../../../../components/ImageView"
import { Message } from "../../../../domain/entities/message"
import { MessageContext } from "../../../../context/MessageContext"

type Props = {
    message: Message
}

export default function RenderImage({ message }: Props) {
    const messageContext = useContext(MessageContext)

    async function previewImage(): Promise<void> {
        if (Platform.OS === "android") {
            const localURL = FileSystem.documentDirectory + message.attachment.name
            const { uri } = await FileSystem.downloadAsync(message.attachment.uri, localURL)

            const contentURI = await FileSystem.getContentUriAsync(uri)

            await IntentLauncher.startActivityAsync(
                "android.intent.action.VIEW",
                { data: contentURI, flags: 1 }
            )

            return
        }

        messageContext.displayImagePreview(true)
        messageContext.setMessage(message)
    }

    return (
        <TouchableOpacity style={styles.root} onPress={previewImage}>
            <View style={styles.image}>
                <ImageView uri={message.attachment.uri} resizeMode="cover" />
            </View>
        </TouchableOpacity>
    )
}
