import { useContext, useState } from "react";
import { getBottomSpace } from 'react-native-iphone-x-helper'

import { Message } from "../../../schemas/Message";
import { ChatContext } from "../../../context/ChatContext";
import { UserContext } from "../../../context/UserContext";
import { useVetCase } from "../../../context/VetCaseContext";
import { useVetCases } from "../../../context/VetCasesContext";
import { sendTextMessage } from "../../../services/network/chat";

export const INPUT_AREA_HEIGHT = 58;

export const useViewModel = () => {
  const { updateVetCaseList } = useVetCases();
  const { userData } = useContext(UserContext);
  const { id: vetCaseId } = useVetCase().vetCase;
  const { setMessages, virtualizedListRef, displaySendFeedback } = useContext(ChatContext);

  const [inputText, setInputText] = useState('');
  const [isFocused, setInputFocus] = useState(false);
  const [isSendButtonEnabled, makeSendButtonEnabled] = useState(true);

  const isEmptyMessage = !inputText.length;
  const [keyboardVerticalOffset, setKeyboardVerticalOffset] = useState(getBottomSpace());

  const onSend = async () => {
    const accessToken = userData?.current_account?.access_token;

    try {
      if (inputText && isSendButtonEnabled) {
        displaySendFeedback(true);
        makeSendButtonEnabled(false);

        const response = await sendTextMessage({
          vetCaseId,
          accessToken,
          message: inputText,
        });

        setMessages((prevMessages: Message[]) => [response, ...prevMessages]);
        virtualizedListRef?.current?.scrollToIndex({ index: 0 });

        updateVetCaseList(response);
      }
    }

    catch (error) {
      console.error('Houve um problema ao enviar mensagem de texto');
      console.error(error);
    }

    finally {
      makeSendButtonEnabled(true);
      displaySendFeedback(false);
      setInputText('');
    }
  };

  function increaseIn(): void {
    setKeyboardVerticalOffset(INPUT_AREA_HEIGHT);
    setInputFocus(false)
  };

  function increaseOut(): void {
    setKeyboardVerticalOffset(getBottomSpace());
    setInputFocus(true)
  };

  return {
    onSend,
    isFocused,
    inputText,
    increaseIn,
    increaseOut,
    setInputText,
    isEmptyMessage,
    keyboardVerticalOffset,
  };
}