import React, { memo } from "react"
import { View } from "react-native"

import { TextView } from "./TextView"
import { AudioView } from "./AudioView"
import { ImageView } from "./ImageView"
import { VideoView } from "./VideoView"
import { DocumentView } from "./DocumentView"

import { Message } from "../../../domain/entities/message"
import { localDate } from "../../../infra/adapters/local-date-adapter"
import { ContainerArea, DoctorName, MessageTime, styles } from "./styles"
import { LocalDateFormatEnum } from "../../../infra/adapters/local-date-adapter/index.gateway"

type Props = {
    message: Message
}

function MessageView({ message }: Props) {
    const createdAt = localDate.toZone(message.createdAt)

    const messageTime = localDate.isToday(createdAt)
        ? localDate.format(createdAt, LocalDateFormatEnum.time)
        : localDate.format(createdAt, LocalDateFormatEnum.datetime)

    return (
        <View style={styles.messageContainer}>
            <ContainerArea isSender={message.isSender}>
                <DoctorName isVisible={!message.isSender} isAdmin={message.isAdmin}>
                    {message.account.doctorName}
                </DoctorName>

                {message.type === "text" && <TextView message={message} />}
                {message.type === "image" && <ImageView message={message} />}
                {message.type === "video" && <VideoView message={message} />}
                {message.type === "audio" && <AudioView message={message} />}
                {message.type === "file" && <DocumentView message={message} />}

                <MessageTime isSender={message.isSender}>
                    {messageTime}
                </MessageTime>
            </ContainerArea>
        </View>
    )
}

export default memo(MessageView)