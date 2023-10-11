import React, { useState } from "react"
import { ActivityIndicator, TouchableOpacity, View } from "react-native"

import { styles } from "./styles"
import Image from "../../../../components/ImageView"
import { Message } from "../../../../domain/entities/message"
import { useFileReader } from "../../../../app/react-hooks/file-reader"

type Props = {
    message: Message
}

export function ImageView({ message }: Props) {
    const fileReader = useFileReader()
    const [isOpening, shouldDisplayLoader] = useState(false)

    async function onPress(): Promise<void> {
        shouldDisplayLoader(true)
        await fileReader.read(message.attachment.name, message.attachment.uri)
        shouldDisplayLoader(false)
    }

    return (
        <TouchableOpacity style={styles.root} onPress={onPress}>
            {isOpening && <ActivityIndicator size={28} style={styles.loader} />}

            <View style={styles.image}>
                <Image uri={message.attachment.uri} resizeMode="cover" />
            </View>
        </TouchableOpacity>
    )
}
