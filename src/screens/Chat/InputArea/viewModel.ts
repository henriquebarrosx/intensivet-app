import { useContext, useState } from "react";
import { getBottomSpace } from 'react-native-iphone-x-helper'

import { useChat } from "../../../context/ChatContext";
import { MessageModel } from "../../../schemas/Message";
import { UserContext } from "../../../context/UserContext";
import { useVetCase } from "../../../context/VetCaseContext";
import { useVetCases } from "../../../context/VetCasesContext";
import { sendTextMessage } from "../../../services/network/chat";
import { MessageMapper } from "../../../infra/mappers/message-mapper";

export const INPUT_AREA_HEIGHT = 58;

export const useViewModel = () => {
  const chatViewModel = useChat()
  const vetCasesViewModel = useVetCases();
  const { sessionData: userData } = useContext(UserContext);
  const { id: vetCaseId } = useVetCase().vetCase;

  const [inputText, setInputText] = useState('');
  const [isFocused, setInputFocus] = useState(false);
  const [isSendButtonEnabled, makeSendButtonEnabled] = useState(true);

  const isEmptyMessage = !inputText.length;
  const [keyboardVerticalOffset, setKeyboardVerticalOffset] = useState(getBottomSpace());

  const onSend = async () => {
    const accessToken = userData?.current_account?.access_token;

    try {
      if (inputText && isSendButtonEnabled) {
        chatViewModel.displaySendFeedback(true);
        makeSendButtonEnabled(false);

        const response = await sendTextMessage({
          vetCaseId,
          accessToken,
          message: inputText,
        });

        await chatViewModel.insertMessage(MessageMapper.apply(response))
        vetCasesViewModel.updateLastMessage(response)
        chatViewModel.scrollToBottom()
      }
    }

    catch (error) {
      console.error('Houve um problema ao enviar mensagem de texto');
      console.error(error);
    }

    finally {
      makeSendButtonEnabled(true);
      chatViewModel.displaySendFeedback(false);
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