import React, { Fragment, useState } from "react"
import { View, VirtualizedList, NativeScrollEvent, NativeSyntheticEvent, ImageBackground, FlatList, RefreshControl } from "react-native"

import Message from "../Message"
import { styles } from "./styles"
import IntroductoryNote from "../IntroductoryNote"
import ScrollToEndButton from "../ScrollToEndButton"
import { useChat } from "../../../context/ChatContext"
import { SendingLoadingFeedback } from "../SendingFeedback"
import { FetchingLoadingFeedback } from "../FetchingFeedback"
import ChatWallpaper from "../../../../assets/images/chat-wallpaper4.jpg"
import { Message as MessageEntity } from "../../../domain/entities/message"
import { useAudioRecord } from "../../../context/RecordAudio"

interface ListInterface {
    index: number
    item: MessageEntity
}

export default function Messages() {
    const chatViewModel = useChat()
    const { isRecordingAudio } = useAudioRecord()
    const [isDisplayingButton, displayButton] = useState(false)

    const isInvertedList = chatViewModel.messages.length > 0
    const internalBottomSpace = isRecordingAudio ? 0 : 90

    const onScroll = ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
        const isCloseToBottom = nativeEvent.contentOffset.y >= 100
        isCloseToBottom ? displayButton(true) : displayButton(false)
    }

    return (
        <View style={{ flex: 1, paddingBottom: internalBottomSpace }}>
            <ImageBackground source={ChatWallpaper} style={styles.root}>
                <FetchingLoadingFeedback isVisible={chatViewModel.isFetching} />

                <VirtualizedList
                    ref={chatViewModel.virtualizedListRef as any}
                    data={chatViewModel.messages}
                    getItemCount={(messages) => messages.length}
                    getItem={(messages, index) => messages[index]}
                    keyExtractor={(message: MessageEntity) => message.id.toString()}
                    renderItem={({ item }: ListInterface) => <Message message={item} />}
                    ListEmptyComponent={IntroductoryNote}
                    inverted={isInvertedList}
                    style={styles.listview}
                    onEndReachedThreshold={0.9}
                    onEndReached={chatViewModel.handlePagination}
                    onScroll={onScroll}
                    contentContainerStyle={{ paddingVertical: 20 }}
                />

                <View style={styles.footerArea}>
                    {isDisplayingButton && <ScrollToEndButton />}
                    <SendingLoadingFeedback isVisible={chatViewModel.isSending} />
                </View>
            </ImageBackground>
        </View>
    )
}
