import { Animated, Keyboard } from "react-native"
import { useEffect, useRef, useState } from "react"

import { useChat } from "../../../context/ChatContext"
import { useVetCase } from "../../../context/VetCaseContext"
import { useVetCasesContext } from "../../../context/VetCasesContext"
import { useServices } from "../../../context/ServicesContext"
import { MessageMapper } from "../../../infra/mappers/message-mapper"

export const INPUT_AREA_HEIGHT = 58

export const useViewModel = () => {
    const chatViewModel = useChat()
    const { messageService } = useServices()
    const vetCasesContext = useVetCasesContext()
    const { id: vetCaseId } = useVetCase().vetCase

    const [inputText, setInputText] = useState("")
    const [isSendButtonEnabled, makeSendButtonEnabled] = useState(true)
    const bottomPosition = useRef(new Animated.Value(0)).current

    const isEmptyMessage = !inputText.length

    async function onSend(): Promise<void> {
        try {
            if (inputText && isSendButtonEnabled) {
                chatViewModel.displaySendFeedback(true)
                makeSendButtonEnabled(false)

                const response = await messageService.create(
                    vetCaseId,
                    { message: inputText }
                )

                await chatViewModel.insertMessage(MessageMapper.apply(response))
                vetCasesContext.receiveMessage(response, true)
                chatViewModel.scrollToBottom()
            }
        }

        finally {
            makeSendButtonEnabled(true)
            chatViewModel.displaySendFeedback(false)
            setInputText("")
        }
    }

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardWillShow', (event) => {
            onFocus(event.endCoordinates.height)
        });
        const hideSubscription = Keyboard.addListener('keyboardWillHide', () => {
            onBlur()
        });

        return () => {
            showSubscription.remove()
            hideSubscription.remove()
        };
    }, [])

    function onFocus(height: number) {
        Animated.timing(bottomPosition, {
            duration: 200,
            useNativeDriver: false,
            toValue: height,
        }).start()
    }

    function onBlur() {
        Animated.timing(bottomPosition, {
            duration: 200,
            useNativeDriver: false,
            toValue: 0,
        }).start()
    }

    return {
        inputText,
        setInputText,
        bottomPosition,
        isEmptyMessage,
        onFocus,
        onBlur,
        onSend,
    }
}