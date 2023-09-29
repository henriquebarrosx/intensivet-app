import React, { useEffect } from "react"
import { StatusBar } from "expo-status-bar"
import { useIsFocused } from "@react-navigation/native"
import { View, KeyboardAvoidingView } from "react-native"

import { styles } from "./styles"
import { useSignIn } from "./viewModel"
import { FormView } from "./components/FormView"
import { LogoImage } from "./components/LogoImage"
import ScreenView from "../../components/ScreenView"
import { pushNotification } from "../../infra/adapters"
import { SubmitButton } from "./components/SubmitButton"

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
            pushNotification.disableNotificationsLocally()
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
