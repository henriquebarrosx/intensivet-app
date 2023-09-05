import React, { useContext, useState } from "react"
import { View, VirtualizedList, NativeScrollEvent, NativeSyntheticEvent, Platform, ImageBackground } from "react-native"

import Message from "./Message"
import { styles } from "./styles"
import IntroductoryNote from "../IntroductoryNote"
import ScrollToEndButton from "../ScrollToEndButton"
import { ChatContext } from "../../../context/ChatContext"
import { SendingLoadingFeedback } from "../SendingFeedback"
import { FetchingLoadingFeedback } from "../FetchingFeedback"
import { Message as MessageModel } from "../../../schemas/Message"
import ChatWallpaper from "../../../../assets/images/chat-wallpaper4.jpg"

interface ListInterface {
  index: number
  item: MessageModel
}

export default function Messages() {
  const [isDisplayingButton, displayButton] = useState(false)
  const { messages, virtualizedListRef, onPaginate, isFetching, isSending } = useContext(ChatContext)

  const isCloseToTop = ({ contentOffset }: NativeScrollEvent) => {
    return contentOffset.y >= 100
  }

  const onScroll = ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
    isCloseToTop(nativeEvent) ? displayButton(true) : displayButton(false)
  }

  return (
    <ImageBackground source={ChatWallpaper} style={styles.root}>
      <FetchingLoadingFeedback isVisible={isFetching} />

      <VirtualizedList
        windowSize={6}
        data={messages}
        onScroll={onScroll}
        initialNumToRender={12}
        maxToRenderPerBatch={12}
        ref={virtualizedListRef}
        onEndReached={onPaginate}
        onEndReachedThreshold={0.8}
        style={styles.virtualizedList}
        inverted={Platform.OS == "ios"}
        getItemCount={() => messages.length}
        ListEmptyComponent={IntroductoryNote}
        contentContainerStyle={{ paddingVertical: 20 }}
        keyExtractor={(message: MessageModel) => message.id.toString()}
        renderItem={({ item }: ListInterface) => <Message message={item} />}
        getItem={(messages: MessageModel[], index: number) => messages[index]}
      />

      <View style={styles.footerArea}>
        {isDisplayingButton && <ScrollToEndButton />}
        <SendingLoadingFeedback isVisible={isSending} />
      </View>
    </ImageBackground>
  )
}
