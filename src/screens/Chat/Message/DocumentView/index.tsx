import React, { useState } from "react"
import { ActivityIndicator, Text, TouchableOpacity } from "react-native"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

import { styles } from "./styles"
import colors from "../../../../utils/colors"
import { Message } from "../../../../domain/entities/message"
import { useFileReader } from "../../../../app/react-hooks/file-reader"

type Props = {
    message: Message
}

export function DocumentView({ message }: Props) {
    const fileReader = useFileReader()
    const [isOpening, shouldDisplayLoader] = useState(false)

    const fileUri = message.attachment.uri
    const fileName = message.attachment.name
    const fileColor = message.isSender ? colors.white : colors.primary

    async function onPress(): Promise<void> {
        shouldDisplayLoader(true)
        await fileReader.read(fileName, fileUri)
        shouldDisplayLoader(false)
    }

    function getFileIconName(): string {
        const iconsByExtensions = [
            { extension: "pdf", name: "file-pdf-box" },
            { extension: "csv", name: "file-excel" },
            { extension: "xlsx", name: "file-excel" },
            { extension: "docx", name: "file-word" },
            { extension: "mp3", name: "music" },
        ]

        const iconByExtension = iconsByExtensions.find(
            ({ extension }) => extension === fileName.split(".").pop()
        )

        return iconByExtension?.name || "file"
    }

    return (
        <TouchableOpacity style={styles.content} onPress={onPress}>
            {isOpening
                ? <ActivityIndicator size={28} color={fileColor} />
                : <MaterialCommunityIcons size={32} color={fileColor} name={getFileIconName()} />
            }

            <Text ellipsizeMode="tail" numberOfLines={1} style={[styles.text, { color: fileColor }]}>
                {fileName}
            </Text>
        </TouchableOpacity>
    )
}