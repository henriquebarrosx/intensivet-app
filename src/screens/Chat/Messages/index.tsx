import React, { useState } from "react"
import { View, VirtualizedList, NativeScrollEvent, NativeSyntheticEvent, ImageBackground } from "react-native"

import Message from "../Message"
import { styles } from "./styles"
import IntroductoryNote from "../IntroductoryNote"
import ScrollToEndButton from "../ScrollToEndButton"
import { SendingLoadingFeedback } from "../SendingFeedback"
import { FetchingLoadingFeedback } from "../FetchingFeedback"
import { useAudioRecord } from "../../../context/RecordAudio"
import ChatWallpaper from "../../../../assets/images/chat-wallpaper4.jpg"
import { Message as MessageEntity } from "../../../domain/entities/message"
import { useVetCaseMessagesContext } from "../../../context/VetCaseMessagesContext"

interface ListInterface {
    index: number
    item: MessageEntity
}

export default function Messages() {
    const { isRecordingAudio } = useAudioRecord()
    const vetCaseMessagesContext = useVetCaseMessagesContext()

    const [isDisplayingButton, displayButton] = useState(false)
    const internalBottomSpace = isRecordingAudio ? 0 : 90

    function onScroll({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>): void {
        const isCloseToBottom = nativeEvent.contentOffset.y >= 100
        isCloseToBottom ? displayButton(true) : displayButton(false)
    }

    return (
        <View style={{ flex: 1, paddingBottom: internalBottomSpace }}>
            <ImageBackground source={ChatWallpaper} style={styles.root}>
                <FetchingLoadingFeedback isVisible={vetCaseMessagesContext.isFetching} />

                <VirtualizedList
                    ref={vetCaseMessagesContext.listViewRef}
                    data={vetCaseMessagesContext.items}
                    getItemCount={(messages) => messages.length}
                    getItem={(messages, index) => messages[index]}
                    keyExtractor={(message: MessageEntity) => message.id.toString()}
                    renderItem={({ item }: ListInterface) => <Message message={item} />}
                    ListEmptyComponent={IntroductoryNote}
                    inverted={vetCaseMessagesContext.isNotEmpty}
                    style={styles.listview}
                    onEndReachedThreshold={0.9}
                    onEndReached={vetCaseMessagesContext.paginate}
                    onScroll={onScroll}
                    contentContainerStyle={{ paddingVertical: 20 }}
                />

                <View style={styles.footerArea}>
                    {isDisplayingButton && <ScrollToEndButton />}
                    <SendingLoadingFeedback isVisible={vetCaseMessagesContext.isSending} />
                </View>
            </ImageBackground>
        </View>
    )
}
