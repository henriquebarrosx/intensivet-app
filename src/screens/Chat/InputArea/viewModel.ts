import { Animated } from "react-native"
import { useRef, useState } from "react"

import { useKeyboard } from "../../../app/react-hooks/keyboard"
import { useVetCasesContext } from "../../../context/VetCasesContext"
import { MessageModelMapper } from "../../../infra/mappers/message-model-mapper"
import { useVetCaseMessagesContext } from "../../../context/VetCaseMessagesContext"

export const INPUT_AREA_HEIGHT = 58

export const useViewModel = () => {
    const vetCasesContext = useVetCasesContext()
    const vetCaseMessagesContext = useVetCaseMessagesContext()

    const [inputText, setInputText] = useState("")
    const [isSendButtonEnabled, makeSendButtonEnabled] = useState(true)
    const bottomPosition = useRef(new Animated.Value(0)).current

    const isEmptyMessage = !inputText.length

    async function onSend(): Promise<void> {
        try {
            if (inputText && isSendButtonEnabled) {
                makeSendButtonEnabled(false)
                const message = await vetCaseMessagesContext.sendText(inputText)
                vetCasesContext.receiveMessage(MessageModelMapper.apply(message), true)
            }
        }

        finally {
            makeSendButtonEnabled(true)
            setInputText("")
        }
    }

    useKeyboard(
        ({ height }) => onFocus(height),
        () => onBlur(),
    )

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