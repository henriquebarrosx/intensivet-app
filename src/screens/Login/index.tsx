import React, { useEffect } from "react"
import { StatusBar } from "expo-status-bar"
import * as Notifications from "expo-notifications"
import { useIsFocused } from "@react-navigation/native"
import { View, KeyboardAvoidingView } from "react-native"

import { styles } from "./styles"
import { useSignIn } from "./viewModel"
import { LogoImage } from "./components/LogoImage"
import { FormView } from "./components/FormView"
import ScreenView from "../../components/ScreenView"
import { SubmitButton } from "./components/SubmitButton"
import { Notification } from "../../models/Notification"


export const Login = () => {
    const isCurrentScreenFocused = useIsFocused()

    const {
        formData,
        validations,
        isSubmitting,
        onFormChange,
        onLoginPress,
        setValidations,
        keyboardBehavior,
    } = useSignIn()

    useEffect(() => {
        if (isCurrentScreenFocused) {
            const notification = new Notification()
            Notifications.setNotificationHandler({ handleNotification: notification.getMuteNotificationConfig() })
        }
    }, [isCurrentScreenFocused])

    return (
        <ScreenView>
            <StatusBar style={"dark"} />

            <KeyboardAvoidingView style={styles.background} behavior={keyboardBehavior}>
                <LogoImage />

                <View style={[styles.container]}>
                    <FormView
                        formData={formData}
                        validations={validations}
                        onFormChange={onFormChange}
                        onValidationChange={setValidations}
                    />

                    <SubmitButton
                        onPress={onLoginPress}
                        isLoadingEffectVisible={isSubmitting}
                    />
                </View>
            </KeyboardAvoidingView>
        </ScreenView>
    )
}
