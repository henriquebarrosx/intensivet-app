import React from "react"
import { TouchableOpacity, View } from "react-native"

import { styles } from "./styles"
import Image from "../../../../components/ImageView"
import { Message } from "../../../../domain/entities/message"
import { useFileReader } from "../../../../app/react-hooks/file-reader"

type Props = {
    message: Message
}

export function ImageView({ message }: Props) {
    const fileReader = useFileReader()

    async function onPress(): Promise<void> {
        await fileReader.read(message.attachment.name, message.attachment.uri)
    }

    return (
        <TouchableOpacity style={styles.root} onPress={onPress}>
            <View style={styles.image}>
                <Image uri={message.attachment.uri} resizeMode="cover" />
            </View>
        </TouchableOpacity>
    )
}
