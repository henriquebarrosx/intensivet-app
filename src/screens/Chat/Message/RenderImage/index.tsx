import React from "react"
import { TouchableOpacity, View } from "react-native"
import { useNavigation } from "@react-navigation/native"

import { styles } from "./styles"
import ImageView from "../../../../components/ImageView"
import { Message } from "../../../../domain/entities/message"

type Props = {
    message: Message
}

export default function RenderImage({ message }: Props) {
    const navigation = useNavigation()

    function previewImage(): void {
        navigation.navigate('WebPage', {
            screenTitle: message.account.doctorName,
            source: message.attachment.uri,
        })
    }

    return (
        <TouchableOpacity style={styles.root} onPress={previewImage}>
            <View style={styles.image}>
                <ImageView uri={message.attachment.uri} resizeMode="cover" />
            </View>
        </TouchableOpacity>
    )
}
