import { useEffect } from "react";
import { Keyboard, KeyboardMetrics } from "react-native"

export function useKeyboard(onFocus: OnFocusEffect, onBlur: OnBlurEffect) {
    useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardWillShow", (event) => {
            onFocus(event.endCoordinates)
        })

        const hideSubscription = Keyboard.addListener("keyboardWillHide", () => {
            onBlur()
        })

        return () => {
            showSubscription.remove()
            hideSubscription.remove()
        }
    }, [])
}

type OnFocusEffect = (data: KeyboardMetrics) => void
type OnBlurEffect = () => void