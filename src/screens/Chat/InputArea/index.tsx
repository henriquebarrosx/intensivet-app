import React, { useEffect } from "react";
import { TextInput } from 'react-native';
import { Platform, View, Keyboard, KeyboardAvoidingView } from 'react-native';

import { styles } from './styles';
import RightSide from './RightSide';
import { useViewModel } from './viewModel';
import { RecordAudioAreaView } from "../../../components/RecordingAudioArea";
import { AudioRecordProvider, useAudioRecord } from "../../../context/RecordAudio";

const InputAreaComponent = () => {
  const { isRecordingAudio } = useAudioRecord();

  const {
    onSend,
    inputText,
    increaseIn,
    increaseOut,
    setInputText,
    isEmptyMessage,
    keyboardVerticalOffset,
  } = useViewModel();

  useEffect(() => {
    increaseIn();

    const showSubscription = Keyboard.addListener("keyboardDidShow", increaseOut);
    const hideSubscription = Keyboard.addListener("keyboardDidHide", increaseIn);

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  if (isRecordingAudio) {
    return <RecordAudioAreaView />;
  }

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={keyboardVerticalOffset}
      behavior={Platform.OS === 'ios' ? 'position' : undefined}
    >
      <View style={[styles.root]}>
        <View style={styles.leftSide}>
          <TextInput
            multiline
            value={inputText}
            onBlur={increaseIn}
            onFocus={increaseOut}
            style={styles.inputText}
            onChangeText={setInputText}
            numberOfLines={Platform.OS === 'android' ? 1 : undefined}
          />
        </View>

        <RightSide
          onSend={onSend}
          isPaperClipDisplayed={isEmptyMessage}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

export const InputArea = () => (
  <AudioRecordProvider>
    <InputAreaComponent />
  </AudioRecordProvider>
)