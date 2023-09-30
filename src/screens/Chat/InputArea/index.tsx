import React from "react"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Animated, KeyboardAvoidingView, Platform } from "react-native"

import RightSide from "./RightSide"
import { useViewModel } from "./viewModel"
import { LeftSide, TextInputView, styles } from "./styles"
import { RecordAudioAreaView } from "../../../components/RecordingAudioArea"
import { AudioRecordProvider, useAudioRecord } from "../../../context/RecordAudio"

const InputAreaComponent = () => {
    const { isRecordingAudio } = useAudioRecord()
    const insets = useSafeAreaInsets()

    const {
        onSend,
        onBlur,
        inputText,
        setInputText,
        bottomPosition,
        isEmptyMessage,
    } = useViewModel()

    if (isRecordingAudio) {
        return <RecordAudioAreaView onCancel={onBlur} />
    }

    return (
        <KeyboardAvoidingView
            keyboardVerticalOffset={insets.top + insets.bottom}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ width: "100%", display: "flex", position: "relative" }}
        >
            <Animated.View style={[styles.inputTextArea, { bottom: bottomPosition }]}>
                <LeftSide>
                    <TextInputView
                        multiline
                        value={inputText}
                        onChangeText={setInputText}
                        numberOfLines={Platform.OS === "android" ? 1 : undefined}
                    />
                </LeftSide>

                <RightSide
                    onSend={onSend}
                    isPaperClipDisplayed={isEmptyMessage}
                />
            </Animated.View>
        </KeyboardAvoidingView>
    )
}

export const InputArea = () => (
    <AudioRecordProvider>
        <InputAreaComponent />
    </AudioRecordProvider>
)