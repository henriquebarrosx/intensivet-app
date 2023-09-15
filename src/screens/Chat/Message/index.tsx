import React, { memo } from "react"
import { View } from "react-native"

import RenderText from "./RenderText"
import RenderAudio from "./RenderAudio"
import RenderVideo from "./RenderVideo"
import RenderImage from "./RenderImage"
import RenderDocument from "./RenderDocument"
import { Message } from "../../../domain/entities/message"
import { localDate } from "../../../infra/adapters/local-date-adapter"
import { ContainerArea, DoctorName, MessageTime, styles } from "./styles"
import { LocalDateFormatEnum } from "../../../infra/adapters/local-date-adapter/index.gateway"

type Props = {
    message: Message
}

function MessageView({ message }: Props) {
    const messageTime = localDate.isToday(message.createdAt)
        ? localDate.format(message.createdAt, LocalDateFormatEnum.time)
        : localDate.format(message.createdAt, LocalDateFormatEnum.datetime)

    return (
        <View style={styles.messageContainer}>
            <ContainerArea isSender={message.isSender}>
                <DoctorName isVisible={!message.isSender} isAdmin={message.isAdmin}>
                    {message.account.doctorName}
                </DoctorName>

                {message.type === "text" && <RenderText message={message} />}
                {message.type === "image" && <RenderImage message={message} />}
                {message.type === "video" && <RenderVideo message={message} />}
                {message.type === "audio" && <RenderAudio message={message} />}
                {message.type === "file" && <RenderDocument message={message} />}

                <MessageTime isSender={message.isSender}>
                    {messageTime}
                </MessageTime>
            </ContainerArea>
        </View>
    )
}

export default memo(MessageView)