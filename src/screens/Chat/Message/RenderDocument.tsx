import React, { memo } from "react"
import { Text, StyleSheet, TouchableOpacity } from "react-native"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

import colors from "../../../utils/colors"
import { Message } from "../../../domain/entities/message"
import { useFileReader } from "../../../app/react-hooks/file-reader"

interface RenderDocumentProps {
    message: Message
}

export default memo(({ message }: RenderDocumentProps) => {
    const fileReader = useFileReader()
    const documentColors = message.isSender ? colors.white : colors.primary

    async function openResource() {
        await fileReader.read(message.attachment.name, message.attachment.uri)
    }

    function getIconName() {
        const foundIcon = icons.find(({ endsWith }) => {
            return endsWith === message.attachment.name.split(".").pop()
        })

        return foundIcon?.icon || "file"
    }

    return (
        <TouchableOpacity style={styles.content} onPress={openResource}>
            <MaterialCommunityIcons size={32} color={documentColors} name={getIconName()} />

            <Text ellipsizeMode="tail" numberOfLines={1} style={[styles.text, { color: documentColors }]}>
                {message.attachment.name}
            </Text>
        </TouchableOpacity>
    )
})

const icons = [
    {
        endsWith: "pdf",
        icon: "file-pdf-box",
    },
    {
        endsWith: "csv",
        icon: "file-excel",
    },
    {
        endsWith: "xlsx",
        icon: "file-excel",
    },
    {
        endsWith: "docx",
        icon: "file-word",
    },
    {
        endsWith: "mp3",
        icon: "music",
    }
]

const styles = StyleSheet.create({
    content: {
        paddingTop: 10,
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: 6,
    },
    text: {
        minWidth: 110,
        maxWidth: "80%",
        paddingLeft: 8,
        paddingRight: 10,
    },
})
