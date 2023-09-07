import React, { useEffect } from "react"
import { Platform, Keyboard, KeyboardAvoidingView } from "react-native"

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
        increaseIn,
        increaseOut,
        setInputText,
        isEmptyMessage,
        keyboardVerticalOffset,
    } = useViewModel()

    useEffect(() => {
        increaseIn()

        const showSubscription = Keyboard.addListener("keyboardDidShow", increaseOut)
        const hideSubscription = Keyboard.addListener("keyboardDidHide", increaseIn)

        return () => {
            showSubscription.remove()
            hideSubscription.remove()
        }
    }, [])

    if (isRecordingAudio) {
        return <RecordAudioAreaView />
    }

    return (
        <KeyboardAvoidingView
            keyboardVerticalOffset={keyboardVerticalOffset}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <Root isToggled={isFocused}>
                <LeftSide>
                    <TextInputView
                        multiline
                        value={inputText}
                        onBlur={increaseIn}
                        onFocus={increaseOut}
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
    )
}

export const InputArea = () => (
    <AudioRecordProvider>
        <InputAreaComponent />
    </AudioRecordProvider>
)