import React from "react"
import { Platform, KeyboardAvoidingView, SafeAreaView } from "react-native"

import RightSide from "./RightSide"
import { useViewModel } from "./viewModel"
import { LeftSide, Root, TextInputView } from "./styles"
import { RecordAudioAreaView } from "../../../components/RecordingAudioArea"
import { AudioRecordProvider, useAudioRecord } from "../../../context/RecordAudio"

const InputAreaComponent = () => {
    const { isRecordingAudio } = useAudioRecord()

    const {
        onSend,
        isFocused,
        inputText,
        onFocus,
        onBlur,
        setInputText,
        isEmptyMessage,
    } = useViewModel()

    if (isRecordingAudio) {
        return <RecordAudioAreaView />
    }

    return (
        <SafeAreaView style={Platform.OS === "ios" && isFocused ? { flex: 1 } : undefined}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}>
                <Root isToggled={isFocused}>
                    <LeftSide>
                        <TextInputView
                            multiline
                            onFocus={onFocus}
                            onBlur={onBlur}
                            value={inputText}
                            onChangeText={setInputText}
                            numberOfLines={Platform.OS === "android" ? 1 : undefined}
                        />
                    </LeftSide>

                    <RightSide
                        onSend={onSend}
                        isPaperClipDisplayed={isEmptyMessage}
                    />
                </Root>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export const InputArea = () => (
    <AudioRecordProvider>
        <InputAreaComponent />
    </AudioRecordProvider>
)