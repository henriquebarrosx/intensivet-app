import { KeyboardAvoidingViewProps, Platform } from "react-native"

export class Keyboard {
    getBehavior(): KeyboardAvoidingViewProps["behavior"] {
        return Platform.OS === "ios" ? "padding" : undefined
    }
}