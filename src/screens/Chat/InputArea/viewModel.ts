import { useState } from "react"
import { getBottomSpace } from "react-native-iphone-x-helper"

import { useChat } from "../../../context/ChatContext"
import { useVetCase } from "../../../context/VetCaseContext"
import { useVetCases } from "../../../context/VetCasesContext"
import { MessageMapper } from "../../../infra/mappers/message-mapper"
import { MessageService } from "../../../infra/services/message-service"
import { httpClient } from "../../../infra/adapters/http-client-adapter"

export const INPUT_AREA_HEIGHT = 58

export const useViewModel = () => {
    const chatViewModel = useChat()
    const vetCasesViewModel = useVetCases()
    const { id: vetCaseId } = useVetCase().vetCase

    const [inputText, setInputText] = useState("")
    const [isFocused, setInputFocus] = useState(false)
    const [isSendButtonEnabled, makeSendButtonEnabled] = useState(true)

    const isEmptyMessage = !inputText.length
    const [keyboardVerticalOffset, setKeyboardVerticalOffset] = useState(getBottomSpace())

    const onSend = async () => {
        try {
            if (inputText && isSendButtonEnabled) {
                chatViewModel.displaySendFeedback(true)
                makeSendButtonEnabled(false)

                const messageService = new MessageService(httpClient)

                const response = await messageService.create(
                    vetCaseId,
                    { message: inputText }
                )

                await chatViewModel.insertMessage(MessageMapper.apply(response))
                vetCasesViewModel.updateLastMessage(response)
                chatViewModel.scrollToBottom()
            }
        }

        finally {
            makeSendButtonEnabled(true)
            chatViewModel.displaySendFeedback(false)
            setInputText("")
        }
    }

    function increaseIn(): void {
        setKeyboardVerticalOffset(INPUT_AREA_HEIGHT)
        setInputFocus(false)
    }

    function increaseOut(): void {
        setKeyboardVerticalOffset(getBottomSpace())
        setInputFocus(true)
    }

    return {
        onSend,
        isFocused,
        inputText,
        increaseIn,
        increaseOut,
        setInputText,
        isEmptyMessage,
        keyboardVerticalOffset,
    }
}